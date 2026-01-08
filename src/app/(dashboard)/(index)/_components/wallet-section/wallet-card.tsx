import { AmericanExpressIcon } from '@/components/icons/american-express';
import { ChipIcon } from '@/components/icons/chip';
import { MasterCardIcon } from '@/components/icons/master-card';
import { VisaIcon } from '@/components/icons/visa';
import { WifiIcon } from '@/components/icons/wifi';
import { cn } from '@/lib/utils';

import { WalletCardsItem } from '@/api/generated/models';

type WalletCardProps = React.HTMLAttributes<HTMLDivElement> & {
  wallet?: WalletCardsItem;
  isSmall?: boolean;
};

export const WalletCard = ({
  wallet,
  className,
  isSmall,
  ...props
}: WalletCardProps) => {
  return (
    <div className={cn('space-y-4 rounded-2xl', className)} {...props}>
      <div className="flex items-center">
        <p className="text-white">{wallet?.bank}</p>
      </div>

      <div className="flex items-center justify-between">
        <ChipIcon />
        <WifiIcon className="size-7 text-inherit" />
      </div>

      {isSmall ? (
        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">{wallet?.cardNumber}</p>
            <p className="text-muted-foreground text-sm font-medium">
              {wallet?.expiryMonth}/{wallet?.expiryYear}
            </p>
          </div>

          {wallet?.network === 'Visa' ? (
            <VisaIcon className="size-12 text-inherit" />
          ) : wallet?.network === 'Mastercard' ? (
            <MasterCardIcon className="size-12" />
          ) : (
            <AmericanExpressIcon className="size-12" />
          )}
        </div>
      ) : (
        <>
          <p className="text-lg font-bold">{wallet?.cardNumber}</p>

          {wallet?.network === 'Visa' ? (
            <VisaIcon className="ml-auto size-12 text-inherit" />
          ) : wallet?.network === 'Mastercard' ? (
            <MasterCardIcon className="ml-auto size-12" />
          ) : (
            <AmericanExpressIcon className="ml-auto size-12" />
          )}
        </>
      )}
    </div>
  );
};
