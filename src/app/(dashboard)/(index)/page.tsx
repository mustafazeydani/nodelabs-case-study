import { RecentTransactionsDataTable } from './_components/recent-transactions-data-table.tsx/recent-transactions-data-table';
import { ScheduledTransfersSection } from './_components/scheduled-transfers-section';
import { StatisticsCardsSection } from './_components/statistic-cards-section';
import { WalletSection } from './_components/wallet-section';
import { WorkingCapitalChart } from './_components/working-capital-chart';
import { metadata } from './_utils/metadata';

export { metadata };

export default function Home() {
  return (
    <div className="flex gap-10">
      <div className="basis-2/3 space-y-4">
        <StatisticsCardsSection />
        <WorkingCapitalChart />
        <RecentTransactionsDataTable />
      </div>

      <div className="basis-1/3 space-y-6">
        <WalletSection />
        <ScheduledTransfersSection />
      </div>
    </div>
  );
}
