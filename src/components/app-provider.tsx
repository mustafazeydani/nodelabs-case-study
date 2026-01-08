'use client';

import React, { Suspense } from 'react';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ToastContainer } from 'react-toastify';

import { getQueryClient } from '@/lib/react-query';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {/* Added Suspense to handle error from progress bar library (useSearchParams() should be wrapped in a suspense boundary at page) */}
        <Suspense>
          <ProgressProvider
            height="3px"
            color="var(--primary)"
            options={{ showSpinner: false }}
            shallowRouting
          >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer />
          </ProgressProvider>
        </Suspense>
      </QueryClientProvider>
    </NuqsAdapter>
  );
};
