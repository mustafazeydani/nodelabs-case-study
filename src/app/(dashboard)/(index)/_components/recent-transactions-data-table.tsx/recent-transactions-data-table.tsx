'use client';

import { Suspense } from 'react';

import { ChevronRight } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetFinancialTransactionsRecentSuspense } from '@/api/generated/react-query/financial';

import { columns } from './columns';

function TableSkeletonLoader() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Button
          variant={'ghost'}
          className="text-secondary hover:text-secondary/80 font-semibold"
        >
          View All
          <ChevronRight />
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={[]} isLoading={true} />
      </CardContent>
    </Card>
  );
}

function RecentTransactionsContent() {
  const { data } = useGetFinancialTransactionsRecentSuspense({ limit: 5 });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Button
          variant={'ghost'}
          className="text-secondary hover:text-secondary/80 font-semibold"
        >
          View All
          <ChevronRight />
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data?.data?.transactions || []} />
      </CardContent>
    </Card>
  );
}

export const RecentTransactionsDataTable = () => {
  return (
    <ErrorBoundary
      fallback={
        <Card>
          <CardContent className="flex h-32 items-center justify-center">
            <p className="text-muted-foreground">Failed to load transactions</p>
          </CardContent>
        </Card>
      }
    >
      <Suspense fallback={<TableSkeletonLoader />}>
        <RecentTransactionsContent />
      </Suspense>
    </ErrorBoundary>
  );
};
