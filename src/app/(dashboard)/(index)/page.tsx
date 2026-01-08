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
  const { dehydratedState } = preloadIndexData(); // Fetch data in server for faster client load

  return (
    <div className="flex gap-10">
      <div className="basis-2/3 space-y-4">
        <HydrationBoundary state={dehydratedState}>
          <StatisticsCardsSection />
          <WorkingCapitalChart />
          <RecentTransactionsDataTable />
        </HydrationBoundary>
      </div>

      <div className="basis-1/3 space-y-6">
        <HydrationBoundary state={dehydratedState}>
          <WalletSection />
          <ScheduledTransfersSection />
        </HydrationBoundary>
      </div>
    </div>
  );
}
