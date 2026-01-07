import { Xior, type XiorError, type XiorRequestConfig } from 'xior';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://case.nodelabs.dev/api';

/* -------------------- XIOR INSTANCE -------------------- */

export const XIOR_INSTANCE = new Xior({
  baseURL,
});

/* -------------------- REQUEST INTERCEPTOR -------------------- */

XIOR_INSTANCE.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

XIOR_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error),
);

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
