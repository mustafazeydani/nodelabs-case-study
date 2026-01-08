import { HydrationBoundary } from '@tanstack/react-query';

import { RecentTransactionsDataTable } from './_components/recent-transactions-data-table.tsx/recent-transactions-data-table';
import { ScheduledTransfersSection } from './_components/scheduled-transfers-section';
import { StatisticsCardsSection } from './_components/statistic-cards-section';
import { WalletSection } from './_components/wallet-section';
import { WorkingCapitalChart } from './_components/working-capital-chart';
import { metadata } from './_utils/metadata';
import { preloadIndexData } from './_utils/preload-data';

export { metadata };

export default function Home() {
  const { dehydratedState } = preloadIndexData();

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-4">
        <HydrationBoundary state={dehydratedState}>
          <StatisticsCardsSection />
          <WorkingCapitalChart />
          <RecentTransactionsDataTable />
        </HydrationBoundary>
      </div>

      <div className="space-y-6 sm:min-w-sm">
        <HydrationBoundary state={dehydratedState}>
          <WalletSection />
          <ScheduledTransfersSection />
        </HydrationBoundary>
      </div>
    </div>
  );
}
