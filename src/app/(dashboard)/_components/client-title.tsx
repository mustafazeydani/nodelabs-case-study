'use client';

import { usePathname } from 'next/navigation';

import { paths } from '@/config/paths';

export const ClientTitle = () => {
  const pathname = usePathname().split('/').pop();

  return (
    <h1 className="text-2xl font-semibold">
      {paths[(pathname as keyof typeof paths) || '/']?.label}
    </h1>
  );
};
