import { NextFetchEvent, NextProxy, NextRequest } from 'next/server';

import { CONSTANTS } from '@/config/constants';

import { ProxyFactory } from './stack-proxies';

export const withAuthProxy: ProxyFactory = (next: NextProxy) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const token = request.cookies.get(CONSTANTS.accessTokenCookieName)?.value;

    if (token) {
      const newHeaders = new Headers(request.headers);
      newHeaders.set('Authorization', `Bearer ${token}`);

      const newRequest = new NextRequest(request, {
        headers: newHeaders,
      });

      return next(newRequest, _next);
    }

    return next(request, _next);
  };
};
