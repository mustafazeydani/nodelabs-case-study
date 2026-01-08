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

    const response = await fetch(fullUrl, {
      headers,
      credentials: 'include',
    });

    const data = await response.json();
    // Pass through the actual API response status and data
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy GET error:', error);
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
  const body = await request.json();

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

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    // Pass through the actual API response status and data
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy POST error:', error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Failed to proxy request',
      },
      { status: 500 },
    );
  }
}
