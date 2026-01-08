'use client';

import { ChevronRight } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetFinancialTransactionsRecent } from '@/api/generated/react-query/financial';

import { columns } from './columns';

export const RecentTransactionsDataTable = () => {
  const { data, isLoading } = useGetFinancialTransactionsRecent({ limit: 5 });

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
        <DataTable
          columns={columns}
          data={data?.data?.transactions || []}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
