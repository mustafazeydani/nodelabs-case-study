import { NextRequest } from 'next/server';

/**
 * Creates headers object with forwarded cookies from the request.
 * Critical for cross-domain requests where httpOnly cookies won't be automatically forwarded.
 */
export const getHeadersWithCookies = (
  request: NextRequest,
): Record<string, string> => {
  const cookieString = request.cookies
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  return cookieString ? { Cookie: cookieString } : {};
};
