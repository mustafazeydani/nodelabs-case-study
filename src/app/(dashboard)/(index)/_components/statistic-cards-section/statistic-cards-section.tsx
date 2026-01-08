'use client';

import { Wallet2Icon } from '@/components/icons/wallet2';

import { useGetFinancialSummary } from '@/api/generated/react-query/financial';

import { StatisticCard } from '../statistic-card';

export const StatisticsCardsSection = () => {
  const { data, isLoading } = useGetFinancialSummary();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-8">
      <StatisticCard
        isMain
        title="Total balance"
        data={data?.data?.totalExpense}
        icon={Wallet2Icon}
      />
    </div>
  );
};
