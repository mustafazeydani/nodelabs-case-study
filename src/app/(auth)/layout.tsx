import Image from 'next/image';

import React from 'react';

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col">
      <div className="flex grow">
        <div className="flex flex-1 flex-col p-8">
          <div className="mx-auto flex w-full max-w-100 grow flex-col">
            <Image
              src="/images/logo.png"
              alt="Nodelabs Logo"
              width={100}
              height={50}
            />

            {children}
          </div>
        </div>

        <div className="relative hidden flex-1 lg:block">
          <Image
            src="/images/sign-in.png"
            alt="Sign In Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
