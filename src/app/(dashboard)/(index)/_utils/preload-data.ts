import { defaultShouldDehydrateQuery, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/react-query';

import {
  getGetFinancialSummaryQueryOptions,
  getGetFinancialTransactionsRecentQueryOptions,
  getGetFinancialWorkingCapitalQueryOptions,
} from '@/api/generated/react-query/financial';

export const preloadIndexData = () => {
  // Prefetch queries on the server to enable progressive streaming.
  // Pending promises are serialized and sent to the client via HydrationBoundary.
  // useSuspenseQuery on the client picks up these promises and shows a skeleton
  // while data loads, then renders content as each query completes.
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getGetFinancialSummaryQueryOptions());
  queryClient.prefetchQuery(getGetFinancialWorkingCapitalQueryOptions());
  queryClient.prefetchQuery(
    getGetFinancialTransactionsRecentQueryOptions({ limit: 5 }),
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
