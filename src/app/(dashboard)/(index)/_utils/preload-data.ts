import { defaultShouldDehydrateQuery, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/react-query';

import {
  getGetFinancialSummaryQueryOptions,
  getGetFinancialTransactionsRecentQueryOptions,
  getGetFinancialTransfersScheduledQueryOptions,
  getGetFinancialWalletQueryOptions,
  getGetFinancialWorkingCapitalQueryOptions,
} from '@/api/generated/react-query/financial';

export const preloadIndexData = () => {
  // Prefetch queries on the server to enable progressive streaming.
  // Pending promises are serialized and sent to the client via HydrationBoundary.
  // useSuspenseQuery on the client picks up these promises and shows a skeleton
  // while data loads, then renders content as each query completes.
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    getGetFinancialSummaryQueryOptions({
      request: {
        next: {
          revalidate: 60, // Revalidate every 60 seconds
        },
      },
    }),
  );
  queryClient.prefetchQuery(
    getGetFinancialWorkingCapitalQueryOptions({
      request: {
        next: {
          revalidate: 60, // Revalidate every 60 seconds
        },
      },
    }),
  );
  queryClient.prefetchQuery(
    getGetFinancialTransactionsRecentQueryOptions(
      { limit: 5 },
      {
        request: {
          next: {
            revalidate: 60,
          },
        },
      },
    ),
  );
  queryClient.prefetchQuery(
    getGetFinancialWalletQueryOptions({
      request: {
        next: {
          revalidate: 60,
        },
      },
    }),
  );
  queryClient.prefetchQuery(
    getGetFinancialTransfersScheduledQueryOptions({
      request: {
        next: {
          revalidate: 60,
        },
      },
    }),
  );

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    shouldRedactErrors: (_error) => {
      return false;
    },
  });

  return { dehydratedState };
};
