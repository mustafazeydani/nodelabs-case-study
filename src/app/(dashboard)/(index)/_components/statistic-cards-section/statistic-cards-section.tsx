'use client';

import { cubicBezier, motion } from 'framer-motion';

import { WalletAddIcon } from '@/components/icons/wallet-add';
import { Wallet2Icon } from '@/components/icons/wallet2';
import { Card, CardContent } from '@/components/ui/card';

import { useGetFinancialSummary } from '@/api/generated/react-query/financial';

import { StatisticCard } from './statistic-card';
import { StatisticSkeletonCard } from './statistic-skeleton-card';

export const StatisticsCardsSection = () => {
  const { data, isLoading } = useGetFinancialSummary();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.42, 0, 0.58, 1),
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 lg:flex-row">
        <StatisticSkeletonCard />
        <StatisticSkeletonCard />
        <StatisticSkeletonCard />
      </div>
    );
  }

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
    <motion.div
      className="flex flex-col gap-8 lg:flex-row"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardVariants}>
        <StatisticCard
          isMain
          title="Total balance"
          data={data?.data?.totalBalance}
          icon={Wallet2Icon}
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <StatisticCard
          title="Total spending"
          data={data?.data?.totalExpense}
          icon={Wallet2Icon}
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <StatisticCard
          title="Total saved"
          data={data?.data?.totalSavings}
          icon={WalletAddIcon}
        />
      </motion.div>
    </motion.div>
  );
};
