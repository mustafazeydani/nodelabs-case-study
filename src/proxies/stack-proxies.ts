import { NextProxy, NextRequest, NextResponse } from 'next/server';

export type ProxyFactory = (proxy: NextProxy) => NextProxy;

export function stackProxies(
  functions: ProxyFactory[] = [],
  index = 0,
): NextProxy {
  const current = functions[index];
  if (current) {
    const next = stackProxies(functions, index + 1);
    return current(next);
  }

  return (request: NextRequest) =>
    NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
}
