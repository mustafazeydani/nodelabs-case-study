import { NextRequest, NextResponse } from 'next/server';

import { CONSTANTS } from '@/config/constants';
import { secrets } from '@/config/secrets';

const baseURL = secrets.api.baseUrl;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');

  if (!target) {
    return NextResponse.json({ error: 'Missing target URL' }, { status: 400 });
  }

  const token = request.cookies.get(CONSTANTS.accessTokenCookieName)?.value;

  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const decodedTarget = decodeURIComponent(target);
    const fullUrl = decodedTarget.startsWith('http')
      ? decodedTarget
      : `${baseURL}${decodedTarget}`;

    // Preserve query parameters from the request (except 'target')
    const url = new URL(fullUrl);
    searchParams.forEach((value, key) => {
      if (key !== 'target') {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      headers,
      credentials: 'include',
    });

    const data = await response.json();
    // Pass through the actual API response status and data
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Failed to proxy request',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');

  if (!target) {
    return NextResponse.json({ error: 'Missing target URL' }, { status: 400 });
  }

  const token = request.cookies.get(CONSTANTS.accessTokenCookieName)?.value;
  let body = {};
  try {
    body = await request.json();
  } catch {
    // Handle empty or invalid JSON body
    body = {};
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const decodedTarget = decodeURIComponent(target);
    const fullUrl = decodedTarget.startsWith('http')
      ? decodedTarget
      : `${baseURL}${decodedTarget}`;

    // Preserve query parameters from the request (except 'target')
    const url = new URL(fullUrl);
    searchParams.forEach((value, key) => {
      if (key !== 'target') {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    const res = NextResponse.json(data, { status: response.status });

    // Handle login: extract and set cookies
    // The backend returns the access token in the response body and the refresh token in Set-Cookie header.
    // We need to extract both and set them as httpOnly cookies on the client response.
    // This is necessary because:
    // 1. The backend uses SameSite=Strict for the refresh cookie, blocking it from being set cross-origin
    // 2. The access token comes in the response body, not in headers
    // 3. By setting both cookies via our same-origin proxy route, they will be accessible for future requests
    if (decodedTarget.includes('/users/login')) {
      // Extract access token from response body and set as httpOnly cookie
      // This prevents the token from being exposed to JavaScript while keeping it available for authenticated requests
      const accessToken = data.data?.accessToken;
      if (accessToken) {
        res.cookies.set(CONSTANTS.accessTokenCookieName, accessToken, {
          httpOnly: true, // Prevents JavaScript access (security)
          secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
          sameSite: 'lax', // Allows the cookie to be sent with top-level navigations
          maxAge: 3600, // 1 hour expiration
        });
      }

      // Forward refresh token from backend's Set-Cookie header
      // The backend sends the refresh token in Set-Cookie with SameSite=Strict,
      // which gets blocked by the browser. We extract it and re-set it through our same-origin proxy.
      const setCookieHeader = response.headers.get('set-cookie');
      if (setCookieHeader) {
        // Use append instead of set to avoid overwriting the access token cookie we just set
        res.headers.append('set-cookie', setCookieHeader);
      }
    }

    // Handle logout: delete authentication cookies
    if (decodedTarget.includes('/users/logout')) {
      res.cookies.delete(CONSTANTS.accessTokenCookieName);
      res.cookies.delete(CONSTANTS.refreshTokenCookieName);
    }

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Failed to proxy request',
      },
      { status: 500 },
    );
  }
}
