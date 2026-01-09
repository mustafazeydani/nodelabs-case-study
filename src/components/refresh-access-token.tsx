'use client';

import { useRouter } from 'next/navigation';

import React from 'react';

export const RefreshAccessToken = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.refresh();
  }, []);

  return null;
};
