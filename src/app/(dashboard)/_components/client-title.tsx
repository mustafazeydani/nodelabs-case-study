'use client';

import { usePathname } from 'next/navigation';

import { paths } from '@/config/paths';

export const ClientTitle = () => {
  const pathname = usePathname().split('/').pop();

  return (
    <h1 className="font-semibold lg:text-2xl">
      {paths[(pathname as keyof typeof paths) || '/']?.label}
    </h1>
  );
};
