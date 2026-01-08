'use client';

import { Suspense } from 'react';

import { ChevronRight } from 'lucide-react';

import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetFinancialTransfersScheduledSuspense } from '@/api/generated/react-query/financial';

import { TransferCard } from './transfer-card';

const TransferSkeletonCard = () => (
  <div className="border-muted flex items-center justify-between border-b py-4">
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
    <Skeleton className="h-4 w-24" />
  </div>
);

function TransfersSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="space-y-0">
        <TransferSkeletonCard />
        <TransferSkeletonCard />
        <TransferSkeletonCard />
      </div>
    </div>
  );
}

function ScheduledTransfersContent() {
  const { data } = useGetFinancialTransfersScheduledSuspense();

  if (!data?.data?.transfers || data.data.transfers.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-24 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            No scheduled transfers
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Scheduled Transfers</p>
          <Button
            variant={'ghost'}
            className="text-secondary hover:text-secondary/80 font-semibold"
          >
            View All
            <ChevronRight />
          </Button>
        </div>

        {data?.data?.transfers?.map((transfer, index) => (
          <TransferCard
            key={transfer.id}
            transfer={transfer}
            isLast={index === (data?.data?.transfers?.length ?? 0) - 1}
          />
        ))}
      </div>
    </div>
  );
}

export const ScheduledTransfersSection = () => {
  return (
    <ErrorBoundary
      fallback={
        <Card>
          <CardContent className="flex h-24 items-center justify-center">
            <p className="text-destructive text-sm">Failed to load transfers</p>
          </CardContent>
        </Card>
      }
    >
      <Suspense fallback={<TransfersSkeleton />}>
        <ScheduledTransfersContent />
      </Suspense>
    </ErrorBoundary>
  );
};
