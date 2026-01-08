import { defaultShouldDehydrateQuery, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/react-query';

import {
  getFinancialSummary,
  getGetFinancialSummaryQueryKey,
} from '@/api/generated/react-query/financial';

export const preloadIndexData = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: getGetFinancialSummaryQueryKey(),
    queryFn: getFinancialSummary,
  });

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    shouldRedactErrors: (_error) => {
      return false;
    },
  });

  return { dehydratedState };
};
