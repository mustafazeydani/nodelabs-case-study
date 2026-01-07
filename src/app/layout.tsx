import './globals.css';

import { Kumbh_Sans } from 'next/font/google';

import type { Metadata } from 'next';

import { MainLayout } from '@/components/layouts/main-layout';
import { AppProvider } from '@/components/providers/app-provider';

const kumbhSans = Kumbh_Sans({
  variable: '--font-kumbh-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'NodeLabs',
    template: '%s | NodeLabs',
  },
  description: 'A case study project for NodeLabs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbhSans.variable} antialiased`}>
        <AppProvider>
          <MainLayout>{children}</MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
