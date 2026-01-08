import { Xior, type XiorError, type XiorRequestConfig } from 'xior';

import { CONSTANTS } from '@/config/constants';
import { secrets } from '@/config/secrets';

// Currently public endpoints that do not require authentication are written here manually.
// This can be improved by adding a tag in the OpenAPI spec for both public and authenticated endpoints and generating this list automatically.
const PUBLIC_ENDPOINTS = [
  '/users/login',
  '/users/register',
  '/users/refresh-token',
];

/* -------------------- XIOR INSTANCE -------------------- */
export const XIOR_INSTANCE = new Xior({
  baseURL: secrets.api.baseUrl,
});

/* -------------------- REQUEST INTERCEPTOR -------------------- */
XIOR_INSTANCE.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      const cookies = await import('next/headers').then((mod) => mod.cookies());
      const token = cookies.get(CONSTANTS.accessTokenCookieName)?.value;

      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } else if (
      !PUBLIC_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint))
    ) {
      // Client-side authenticated: route through internal Next.js proxy
      // baseURL should be empty for internal routes
      config.baseURL = '';
      const originalUrl = config.url;
      if (originalUrl && !originalUrl.startsWith('/api/')) {
        config.url = `/api/proxy?target=${encodeURIComponent(originalUrl)}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* -------------------- RESPONSE INTERCEPTOR -------------------- */
XIOR_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error),
);

/* -------------------- CUSTOM INSTANCES -------------------- */
export const customInstance = <T>(
  config: XiorRequestConfig,
  options?: XiorRequestConfig,
): Promise<T> => {
  return XIOR_INSTANCE.request({
    ...config,
    ...options,
  }).then(({ data }) => data as T);
};

/* -------------------- ORVAL TYPES -------------------- */

export type ErrorType<T> = XiorError<T>;
