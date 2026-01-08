'use client';

import { Ellipsis } from 'lucide-react';

import { useGetFinancialWallet } from '@/api/generated/react-query/financial';

import { WalletCard } from './wallet-card';

export const WalletSection = () => {
  const { data } = useGetFinancialWallet();
  
  return (
    <div className="grow space-y-4">
      <div className="flex flex-1 items-center justify-between">
        <p className="text-lg font-semibold">Wallet</p>
        <Ellipsis className="text-muted-foreground" />
      </div>

      <WalletCard
        wallet={data?.data?.cards?.[0]}
        style={{
          background:
            'linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)',
        }}
        className="px-10 py-6 text-white"
      />
      <div className="relative mx-auto -mt-[20%] w-[90%]">
        <WalletCard
          wallet={data?.data?.cards?.[1]}
          style={{
            background:
              'linear-gradient(180deg, rgba(149, 149, 149, 0.4) 0%, rgba(50, 64, 0, 0.1) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          className="text-foreground px-8 py-4"
          isSmall
        />
      </div>
    </div>
  );
};
