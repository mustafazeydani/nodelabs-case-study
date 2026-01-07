// This proxy adds security headers to the response.
import { NextFetchEvent, NextProxy, NextRequest } from 'next/server';

import { ProxyFactory } from './stack-proxies';

export const withHeadersProxy: ProxyFactory = (next: NextProxy) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);

    if (res) {
      res.headers.set('x-content-type-options', 'nosniff');
      res.headers.set('x-dns-prefetch-control', 'false');
      res.headers.set('x-download-options', 'noopen');
      res.headers.set('x-frame-options', 'SAMEORIGIN');
      res.headers.set(
        'x-current-path',
        request.nextUrl.pathname + request.nextUrl.search,
      );
      res.headers.set(
        'strict-transport-security',
        'max-age=63072000; includeSubDomains; preload',
      );
      res.headers.set('referrer-policy', 'no-referrer');
      res.headers.set(
        'permissions-policy',
        'camera=(), microphone=(), geolocation=()',
      );
    }
    return res;
  };
};
