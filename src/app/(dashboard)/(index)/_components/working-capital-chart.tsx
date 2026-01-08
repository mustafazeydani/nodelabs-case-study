'use client';

import { cubicBezier, motion } from 'framer-motion';
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

const chartVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.42, 0, 0.58, 1),
    },
  },
};

export const WorkingCapitalChart = () => {
  const { data, isLoading } = useGetFinancialWorkingCapital();

  const chartData = data?.data?.data;

  if (isLoading) {
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

  if (!chartData) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center ">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <Card>
          <CardContent className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground">Failed to load chart</p>
          </CardContent>
        </Card>
      }
    >
      <motion.div variants={chartVariants} initial="hidden" animate="visible">
        <Card className="shadow-none">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Working Capital
            </CardTitle>

            <div className="flex items-center gap-16">
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
      </motion.div>
    </ErrorBoundary>
  );
};
