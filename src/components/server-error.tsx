'use client';

import { usePathname } from 'next/navigation';

import React from 'react';

import { useRouter } from '@bprogress/next/app';

import { paths } from '@/config/paths';

import { usePostUsersRefreshToken } from '@/api/generated/react-query/user';

export const ServerError = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate } = usePostUsersRefreshToken({
    mutation: {
      onSuccess: () => {
        router.refresh();
      },
      onError: () => {
        router.replace(paths['sign-in'].getHref({ redirectTo: pathname }));
      },
    },
  });

  React.useEffect(() => {
    mutate();
  }, [mutate]);

  return null;
};
