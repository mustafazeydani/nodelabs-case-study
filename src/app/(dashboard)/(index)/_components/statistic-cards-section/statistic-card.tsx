import { cn, formatCurrency } from '@/lib/utils';

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
  return (
    <div
      className={cn('bg-muted flex items-center gap-4 rounded-lg px-5 py-6', {
        'w-full bg-[oklch(0.3466_0.0103_253.97)]': isMain,
      })}
    >
      <div
        className={cn('rounded-full bg-[#EBE8E8] p-3', {
          'bg-[oklch(0.4368_0.0097_253.93)]': isMain,
        })}
      >
        <Icon
          className={cn('text-foreground size-6', {
            'text-primary': isMain,
          })}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-sm">{title}</h3>
        <p
          className={cn('text-foreground text-2xl font-bold', {
            'text-background': isMain,
          })}
        >
          {formatCurrency(data?.amount, data?.currency)}
        </p>
      </div>
    </div>
  );
};
