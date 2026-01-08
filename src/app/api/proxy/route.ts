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

  const decodedTarget = decodeURIComponent(target);
  const token = request.cookies.get(CONSTANTS.accessTokenCookieName)?.value;

  const headers = new Headers();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Forward cookies to backend - critical for refresh token to work
  const cookieString = request.cookies
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  if (cookieString) {
    headers.set('Cookie', cookieString);
  }

  try {
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
    });

    const data = await response.json();
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

  const decodedTarget = decodeURIComponent(target);
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

  // Forward cookies to backend - critical for refresh token to work
  // The cookies are stored on the Next.js domain but need to be forwarded to the backend
  const cookieString = request.cookies
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  if (cookieString) {
    headers.set('Cookie', cookieString);
  }

  try {
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
    });

    const data = await response.json();
    const res = NextResponse.json(data, { status: response.status });

    // Handle login: extract and set cookies
    if (decodedTarget.includes('/users/login')) {
      const accessToken = data.data?.accessToken;
      if (accessToken) {
        res.cookies.set(CONSTANTS.accessTokenCookieName, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 3600,
        });
      }

      const setCookieHeader = response.headers.get('set-cookie');
      if (setCookieHeader) {
        res.headers.append('set-cookie', setCookieHeader);
      }
    }

    // Handle refresh: extract and set new access token cookie
    if (decodedTarget.includes('/users/refresh-token')) {
      const accessToken = data.data?.accessToken;
      if (accessToken) {
        res.cookies.set(CONSTANTS.accessTokenCookieName, accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 3600,
        });
      }

      const setCookieHeader = response.headers.get('set-cookie');
      if (setCookieHeader) {
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
