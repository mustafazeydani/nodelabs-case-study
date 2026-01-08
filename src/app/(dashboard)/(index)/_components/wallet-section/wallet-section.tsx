'use client';

import { Suspense } from 'react';

import { Ellipsis } from 'lucide-react';

import { ErrorBoundary } from '@/components/error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetFinancialWalletSuspense } from '@/api/generated/react-query/financial';

import { WalletCard } from './wallet-card';

function WalletSkeleton() {
  return (
    <div className="grow space-y-4">
      <div className="flex flex-1 items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-6" />
      </div>

      <Skeleton className="h-56 w-full rounded-2xl" />
      <div className="relative mx-auto -mt-[20%] w-[90%]">
        <Skeleton className="h-44 w-full rounded-2xl" />
      </div>
    </div>
  );
}

function WalletSectionContent() {
  const { data } = useGetFinancialWalletSuspense();

  return (
    <div className="animate-fade-in grow space-y-4">
      <div className="flex flex-1 items-center justify-between">
        <p className="text-lg font-semibold">Wallet</p>
        <Ellipsis className="text-muted-foreground" />
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <WalletCard
          wallet={data?.data?.cards?.[0]}
          style={{
            background:
              'linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)',
          }}
          className="px-10 py-6 text-white"
        />
        <div className="relative mx-auto -mt-[20%] w-[90%]">
          <WalletCard
            wallet={data?.data?.cards?.[1]}
            style={{
              background:
                'linear-gradient(180deg, rgba(149, 149, 149, 0.4) 0%, rgba(50, 64, 0, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            className="text-foreground px-8 py-4"
            isSmall
          />
        </div>
      </div>
    </div>
  );
}

export const WalletSection = () => {
  return (
    <ErrorBoundary
      fallback={
        <div className="border-destructive/20 bg-destructive/5 flex h-40 items-center justify-center rounded-lg border">
          <p className="text-destructive text-sm">Failed to load wallet</p>
        </div>
      }
    >
      <Suspense fallback={<WalletSkeleton />}>
        <WalletSectionContent />
      </Suspense>
    </ErrorBoundary>
  );
};
