'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@/components/error-boundary';
import { WalletAddIcon } from '@/components/icons/wallet-add';
import { Wallet2Icon } from '@/components/icons/wallet2';
import { Card, CardContent } from '@/components/ui/card';

import { useGetFinancialSummarySuspense } from '@/api/generated/react-query/financial';

import { StatisticCard } from './statistic-card';
import { StatisticSkeletonCard } from './statistic-skeleton-card';

function StatisticsCardsContent() {
  const { data } = useGetFinancialSummarySuspense();

  if (!data?.data) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            No statistics data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in flex flex-col flex-wrap gap-8 lg:flex-row">
      <div
        className="animate-fade-in-stagger flex-1"
        style={{ animationDelay: '0s' }}
      >
        <StatisticCard
          isMain
          title="Total balance"
          data={data?.data?.totalBalance}
          icon={Wallet2Icon}
        />
      </div>
      <div
        className="animate-fade-in-stagger flex-1"
        style={{ animationDelay: '0.2s' }}
      >
        <StatisticCard
          title="Total spending"
          data={data?.data?.totalExpense}
          icon={Wallet2Icon}
        />
      </div>
      <div
        className="animate-fade-in-stagger flex-1"
        style={{ animationDelay: '0.3s' }}
      >
        <StatisticCard
          title="Total saved"
          data={data?.data?.totalSavings}
          icon={WalletAddIcon}
        />
      </div>
    </div>
  );
}

export const StatisticsCardsSection = () => (
  <ErrorBoundary
    fallback={
      <div className="border-destructive/20 bg-destructive/5 flex h-40 items-center justify-center rounded-lg border">
        <p className="text-destructive text-sm">Failed to load statistics</p>
      </div>
    }
  >
    <Suspense
      fallback={
        <div className="flex flex-col gap-8 lg:flex-row">
          <StatisticSkeletonCard />
          <StatisticSkeletonCard />
          <StatisticSkeletonCard />
        </div>
      }
    >
      <StatisticsCardsContent />
    </Suspense>
  </ErrorBoundary>
);
