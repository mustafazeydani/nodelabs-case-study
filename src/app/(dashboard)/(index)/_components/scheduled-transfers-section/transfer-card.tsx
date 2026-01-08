import Image from 'next/image';

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
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <Image
            src={transfer.image || '/placeholder-image.png'}
            alt={transfer.name || 'Transfer Image'}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

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
