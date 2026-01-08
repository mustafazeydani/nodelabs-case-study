import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

import { ScheduledTransfersTransfersItem } from '@/api/generated/models';

type TransferCardProps = {
  transfer: ScheduledTransfersTransfersItem;
  isLast?: boolean;
};
export const TransferCard = ({ transfer, isLast }: TransferCardProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between py-4',
        !isLast && 'border-muted border-b',
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={transfer.image} alt={transfer.name} />
          <AvatarFallback>{transfer.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold">{transfer.name}</p>
          <p className="text-muted-foreground text-sm">
            {formatDate(transfer.date)}
          </p>
        </div>
      </div>

      <p className="font-semibold">
        {formatCurrency(transfer.amount, transfer.currency)}
      </p>
    </div>
  );
};
