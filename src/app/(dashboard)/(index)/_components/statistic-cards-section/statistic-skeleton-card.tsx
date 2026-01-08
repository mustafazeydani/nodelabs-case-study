import { Skeleton } from '@/components/ui/skeleton';

export const StatisticSkeletonCard = () => (
  <div className="bg-muted flex items-center gap-4 rounded-lg px-5 py-6">
    <div className="rounded-full bg-[#EBE8E8] p-3">
      <Skeleton className="h-6 w-6" />
    </div>

    <div className="w-full space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
    </div>
  </div>
);
