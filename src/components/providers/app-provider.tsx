'use client';

import React from 'react';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getQueryClient } from '@/lib/react-query';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        height="3px"
        color="var(--primary)"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ProgressProvider>
    </QueryClientProvider>
  );
};
