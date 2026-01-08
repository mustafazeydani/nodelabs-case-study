import { Xior, type XiorError, type XiorRequestConfig } from 'xior';

import { CONSTANTS } from '@/config/constants';
import { secrets } from '@/config/secrets';

/* -------------------- XIOR INSTANCE -------------------- */
export const XIOR_INSTANCE = new Xior({
  baseURL: secrets.api.baseUrl,
  credentials: 'include',
});

/* -------------------- REQUEST INTERCEPTOR -------------------- */
XIOR_INSTANCE.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      console.log('SERVER SIDE REQUEST', config.url);
      const cookies = await import('next/headers').then((mod) => mod.cookies());
      const token = cookies.get(CONSTANTS.accessTokenCookieName)?.value;

      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } else {
      // Client-side: route through internal Next.js proxy
      // baseURL should be empty for internal routes
      console.log('CLIENT SIDE REQUEST', config.url);
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
