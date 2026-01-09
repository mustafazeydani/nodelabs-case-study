'use client';

import { ChevronRight } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetFinancialTransactionsRecent } from '@/api/generated/react-query/financial';

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
  const { data, isLoading } = useGetFinancialTransactionsRecent({ limit: 5 });

  if (isLoading) {
    return <TableSkeletonLoader />;
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="sm:text-lg">Recent Transactions</CardTitle>
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
        <div className="border-destructive/20 bg-destructive/5 flex h-40 items-center justify-center rounded-lg border">
          <p className="text-destructive text-sm">
            Failed to load transactions
          </p>
        </div>
      }
    >
      <RecentTransactionsContent />
    </ErrorBoundary>
  );
};
