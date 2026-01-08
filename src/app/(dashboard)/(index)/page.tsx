import { RecentTransactionsDataTable } from './_components/recent-transactions-data-table.tsx/recent-transactions-data-table';
import { StatisticsCardsSection } from './_components/statistic-cards-section';
import { WorkingCapitalChart } from './_components/working-capital-chart';
import { metadata } from './_utils/metadata';

export { metadata };

export default function Home() {
  return (
    <div className="flex gap-8">
      <div className="space-y-4">
        <StatisticsCardsSection />
        <WorkingCapitalChart />
        <RecentTransactionsDataTable />
      </div>
    </div>
  );
}
