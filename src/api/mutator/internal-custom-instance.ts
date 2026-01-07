import { Xior, type XiorError, type XiorRequestConfig } from 'xior';

/* -------------------- XIOR INSTANCE (INTERNAL API ROUTES) -------------------- */

export const XIOR_INTERNAL_INSTANCE = new Xior({
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
});

/* -------------------- REQUEST INTERCEPTOR -------------------- */

XIOR_INTERNAL_INSTANCE.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

/* -------------------- RESPONSE INTERCEPTOR -------------------- */

XIOR_INTERNAL_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error),
);

/* -------------------- CUSTOM INSTANCE -------------------- */

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
