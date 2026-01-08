/* eslint-disable  @typescript-eslint/no-explicit-any */
import { DefaultOptions, UseMutationOptions } from '@tanstack/react-query';
import { isServer, QueryClient } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  },
} satisfies DefaultOptions;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
  ErrorType = Error, // Default to `Error` if not provided
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  ErrorType, // Allow custom error types
  Parameters<MutationFnType>[0]
>;
