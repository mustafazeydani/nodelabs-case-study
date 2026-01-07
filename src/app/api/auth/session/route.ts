import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { CONSTANTS } from '@/config/constants';

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  if (!token) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set(CONSTANTS.accessTokenCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ success: true });
}
