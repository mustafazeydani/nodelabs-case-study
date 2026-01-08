'use client';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useGetFinancialTransfersScheduled } from '@/api/generated/react-query/financial';

import { TransferCard } from './transfer-card';

export const ScheduledTransfersSection = () => {
  const { data } = useGetFinancialTransfersScheduled();

  return (
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
  );
};
