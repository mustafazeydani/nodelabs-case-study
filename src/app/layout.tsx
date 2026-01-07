import './globals.css';

import { Kumbh_Sans } from 'next/font/google';

import type { Metadata } from 'next';

import { AppProvider } from '@/components/app-provider';

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
      <head>
        <meta name="apple-mobile-web-app-title" content="Nodelabs Software" />
      </head>
      <body className={`${kumbhSans.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
