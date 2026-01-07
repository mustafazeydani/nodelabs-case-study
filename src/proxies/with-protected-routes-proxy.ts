import {
  NextFetchEvent,
  NextProxy,
  NextRequest,
  NextResponse,
} from 'next/server';

import { CONSTANTS } from '@/config/constants';
import { paths } from '@/config/paths';

import { ProxyFactory } from './stack-proxies';

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

// Routes that redirect authenticated users away (auth pages)
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export const withProtectedRoutesProxy: ProxyFactory = (next: NextProxy) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/api') || pathname.startsWith('/trpc')) {
      return next(request, _next);
    }

    const token = request.cookies.get(CONSTANTS.accessTokenCookieName)?.value;
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      pathname.startsWith(route),
    );
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && token) {
      return NextResponse.redirect(new URL(paths['/'].getHref(), request.url));
    }

    // Redirect unauthenticated users to login (except on public routes)
    if (!isPublicRoute && !token) {
      const loginUrl = new URL(
        paths['/sign-in'].getHref({ redirectTo: pathname }),
        request.url,
      );
      return NextResponse.redirect(loginUrl);
    }

    return next(request, _next);
  };
};
