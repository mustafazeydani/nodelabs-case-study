import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { CONSTANTS } from '@/config/constants';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(CONSTANTS.accessTokenCookieName);

  return NextResponse.json({ success: true });
}
