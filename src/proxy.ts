import { stackProxies } from './proxies/stack-proxies';
import { withAuthProxy } from './proxies/with-auth-proxy';
import { withHeadersProxy } from './proxies/with-headers-proxy';
import { withProtectedRoutesProxy } from './proxies/with-protected-routes-proxy';

const proxies = [withProtectedRoutesProxy, withAuthProxy, withHeadersProxy];

export default stackProxies(proxies);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
