import { Xior, type XiorError, type XiorRequestConfig } from 'xior';

import { CONSTANTS } from '@/config/constants';
import { paths } from '@/config/paths';
import { secrets } from '@/config/secrets';

import {
  postUsersLogout,
  postUsersRefreshToken,
} from '../generated/react-query/user';

/* -------------------- TOKEN REFRESH QUEUE -------------------- */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: XiorRequestConfig;
}> = [];

const getDecodedTarget = (url?: string): string => {
  if (!url) return '';
  try {
    const urlObj = new URL(
      url,
      typeof window !== 'undefined'
        ? window.location.origin
        : secrets.app.baseUrl,
    );
    return decodeURIComponent(urlObj.searchParams.get('target') || '');
  } catch {
    return '';
  }
};

const processQueue = (error: XiorError | null) => {
  failedQueue.forEach((prom) => {
    if (!error) {
      prom.resolve(XIOR_INSTANCE.request(prom.config));
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

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
    } else {
      // Client-side: route through internal Next.js proxy to read httpOnly cookies
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
  async (error) => {
    const originalRequest = error.config;

    // Client-side 401 handling: attempt token refresh
    const decodedTarget = getDecodedTarget(originalRequest?.url);
    if (
      error.response?.status === 401 &&
      typeof window !== 'undefined' &&
      !decodedTarget.includes('/users/login') &&
      !decodedTarget.includes('/users/refresh-token')
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Call refresh endpoint
          await postUsersRefreshToken();
          isRefreshing = false;
          processQueue(null);

          // Retry original request
          if (originalRequest) {
            return XIOR_INSTANCE.request(originalRequest);
          }
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError as XiorError);

          // Logout on refresh failure
          try {
            await postUsersLogout();
          } catch {
            // Ignore logout errors because user might already be logged out
          }

          // Refresh failed, redirect to login
          window.location.href = paths['sign-in'].getHref();
          return Promise.reject(refreshError);
        }
      }

      // Queue this request while refresh is in progress
      return new Promise((resolve, reject) => {
        if (originalRequest) {
          failedQueue.push({ resolve, reject, config: originalRequest });
        } else {
          reject(error);
        }
      });
    }

    return Promise.reject(error);
  },
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
