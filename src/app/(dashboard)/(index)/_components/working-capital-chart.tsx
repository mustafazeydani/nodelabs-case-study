'use client';

import { ChevronDown } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

import { useGetFinancialWorkingCapital } from '@/api/generated/react-query/financial';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--secondary)',
  },
  expense: {
    label: 'Expense',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

const map = {
  last6Months: 'Last 6 months',
};

function ChartSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Skeleton className="size-3 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-3 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </CardHeader>
      <CardContent className="h-64 overflow-hidden">
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  );
}

function WorkingCapitalChartContent() {
  const { data, isLoading } = useGetFinancialWorkingCapital();

  const chartData = data?.data?.data;

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (!chartData) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in opacity-0">
      <Card className="shadow-none">
        <CardHeader className="flex flex-col items-center justify-between sm:flex-row">
          <CardTitle className="font-semibold lg:text-lg">
            Working Capital
          </CardTitle>

          <div className="flex flex-col gap-4 sm:flex-row md:items-center xl:gap-8 2xl:gap-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="bg-secondary size-3 shrink-0 rounded-full" />
                <p className="text-xs">Income</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-primary size-3 shrink-0 rounded-full" />
                <p className="text-xs">Expense</p>
              </div>
            </div>

            <Button variant="ghost" className="bg-muted">
              {map[data.data?.period as keyof typeof map]}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-64 overflow-hidden p-0">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={{
                  stroke: 'none',
                  fill: 'url(#cursorGradient)',
                }}
                content={
                  <ChartTooltipContent
                    valueFormatter={(value) =>
                      formatCurrency(value as number, data.data?.currency, 0)
                    }
                  />
                }
              />
              <Line
                dataKey="income"
                type="monotone"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="expense"
                type="monotone"
                stroke="var(--color-expense)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export const WorkingCapitalChart = () => {
  return (
    <ErrorBoundary
      fallback={
        <div className="border-destructive/20 bg-destructive/5 flex h-40 items-center justify-center rounded-lg border">
          <p className="text-destructive text-sm">
            Failed to load working capital chart
          </p>
        </div>
      }
    >
      <WorkingCapitalChartContent />
    </ErrorBoundary>
  );
};
