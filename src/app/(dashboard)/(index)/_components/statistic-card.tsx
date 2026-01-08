import { cn } from '@/lib/utils';

import {
  FinancialSummaryTotalBalance,
  FinancialSummaryTotalExpense,
  FinancialSummaryTotalSavings,
} from '@/api/generated/models';

type StatisticCardProps = {
  isMain?: boolean;
  icon: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { className?: string }
  >;
  title: string;
  data:
    | FinancialSummaryTotalExpense
    | FinancialSummaryTotalBalance
    | FinancialSummaryTotalSavings
    | undefined;
};

export const StatisticCard = ({
  isMain = false,
  icon: Icon,
  title,
  data,
}: StatisticCardProps) => {
  console.log('data', data);
  return (
    <div
      className={cn('rounded-lg p-8', {
        'w-full bg-[oklch(0.3466_0.0103_253.97)]': isMain,
      })}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="rounded-full bg-[oklch(0.4368_0.0097_253.93)] p-2">
          <Icon
            className={cn('text-foreground size-6', {
              'text-primary': isMain,
            })}
          />
        </div>

        <div>
          <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
          <p>{data?.amount}</p>
        </div>
      </div>
    </div>
  );
};
