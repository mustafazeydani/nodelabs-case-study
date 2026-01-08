import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency, formatDate } from '@/lib/utils';

import { RecentTransactionsTransactionsItem } from '@/api/generated/models';

export const columns: ColumnDef<RecentTransactionsTransactionsItem>[] = [
  {
    id: 'name-business',
    header: 'Name/Business',
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={transaction.image} alt={transaction.name} />
            <AvatarFallback>{transaction.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-medium">{transaction.name}</div>
            <div className="text-muted-foreground text-sm">
              {transaction.business}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type;
      return <span className="text-muted-foreground">{type}</span>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.original.amount || 0;
      console.log(amount);
      const currency = row.original.currency || 'USD';
      const formattedAmount = formatCurrency(amount, currency);
      return <span className="font-semibold">{formattedAmount}</span>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.original.date;
      const formattedDate = formatDate(date);
      return <span className="text-muted-foreground">{formattedDate}</span>;
    },
  },
];
