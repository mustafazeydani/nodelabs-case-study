import { NextRequest } from 'next/server';

/**
 * Creates a route matcher similar to Clerk's createRouteMatcher
 * Supports glob patterns like:
 * - '/dashboard' - exact match
 * - '/dashboard(.*)' - prefix match with wildcard
 * - '/api/(.*)' - any path starting with /api/
 */
export function createRouteMatcher(patterns: string[]) {
  return (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;

    return patterns.some((pattern) => {
      // Convert glob pattern to regex
      // /dashboard(.*) -> ^/dashboard.*$
      // /api/(.*) -> ^/api/.*$
      const regexPattern = pattern
        .replace(/\(/g, '(?:')
        .replace(/\[([^\]]+)\]/g, '[$1]')
        .replace(/\*/g, '.*');

      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(pathname);
    });
  };
}
