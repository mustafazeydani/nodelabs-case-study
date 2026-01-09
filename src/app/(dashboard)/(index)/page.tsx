import { RecentTransactionsDataTable } from './_components/recent-transactions-data-table.tsx/recent-transactions-data-table';
import { ScheduledTransfersSection } from './_components/scheduled-transfers-section';
import { StatisticsCardsSection } from './_components/statistic-cards-section';
import { WalletSection } from './_components/wallet-section';
import { WorkingCapitalChart } from './_components/working-capital-chart';
import { metadata } from './_utils/metadata';

export { metadata };

/**
 * Note: This page uses client-side data fetching with React Query hooks rather than
 * server-side fetching with Suspense boundaries. This was chosen because:
 *
 * 1. Server-side Suspense queries with preloaded data provide better perceived performance
 *    and progressive streaming capabilities
 * 2. However, client-side data fetching with proper loading states (skeleton screens) was
 *    more practical for this implementation given the token refresh requirements at the
 *    interceptor level and the need to handle 401 errors gracefully
 * 3. The ErrorBoundary wrapper on each section ensures proper error handling with client-side
 *    queries while still providing a smooth loading experience with skeleton UI
 *
 * Context: This is an authenticated dashboard application where critical requirements like
 * SEO are not applicable (users must be logged in). The focus is on a smooth UX with proper
 * loading states and error handling rather than server-side rendering optimization for
 * public-facing content.
 */
export default function Home() {
  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-4">
        <StatisticsCardsSection />
        <WorkingCapitalChart />
        <RecentTransactionsDataTable />
      </div>

      <div className="space-y-6 sm:min-w-sm">
        <WalletSection />
        <ScheduledTransfersSection />
      </div>
    </div>
  );
}
