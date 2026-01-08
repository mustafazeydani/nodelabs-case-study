'use client';

import { ChevronDown } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/lib/utils';

import { useGetFinancialWorkingCapital } from '@/api/generated/react-query/financial';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--primary)',
  },
  expense: {
    label: 'Expense',
    color: 'var(--secondary)',
  },
} satisfies ChartConfig;

const map = {
  last6Months: 'Last 6 months',
};

export const WorkingCapitalChart = () => {
  const { data } = useGetFinancialWorkingCapital();

  const chartData = data?.data?.data;

  if (!chartData) {
    return null;
  }

  return (
    <Card className="shadow-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold">Working Capital</CardTitle>

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
  );
};
