import React from 'react';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return <main className="flex min-h-screen flex-1 flex-col">{children}</main>;
};
