import { Xior, type XiorError, type XiorRequestConfig } from 'xior';

import { CONSTANTS } from '@/config/constants';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://case.nodelabs.dev/api';

/* -------------------- XIOR INSTANCE (EXTERNAL API) -------------------- */

export const XIOR_INSTANCE = new Xior({
  baseURL,
});

/* -------------------- XIOR INSTANCE (INTERNAL API ROUTES) -------------------- */

export const XIOR_INTERNAL_INSTANCE = new Xior({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
    ? undefined
    : 'http://localhost:3000',
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
    }
    return config;
  },
  (error) => Promise.reject(error),
);

XIOR_INTERNAL_INSTANCE.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

/* -------------------- RESPONSE INTERCEPTOR -------------------- */

XIOR_INSTANCE.interceptors.response.use(
  (response) => response.data,
  async (error) => Promise.reject(error),
);

XIOR_INTERNAL_INSTANCE.interceptors.response.use(
  (response) => response.data,
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

export const customInternalInstance = <T>(
  config: XiorRequestConfig,
  options?: XiorRequestConfig,
): Promise<T> => {
  return XIOR_INTERNAL_INSTANCE.request({
    ...config,
    ...options,
  }).then(({ data }) => data as T);
};

/* -------------------- ORVAL TYPES -------------------- */

export type ErrorType<T> = XiorError<T>;
