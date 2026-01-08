'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from '@bprogress/next/app';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useActivePath } from '@/hooks/use-active-path';
import { paths } from '@/config/paths';

import { usePostUsersLogout } from '@/api/generated/react-query/user';

import { HelpIcon } from './icons/help';
import { HomeIcon } from './icons/home';
import { InvoicesIcon } from './icons/invoices';
import { LogoutIcon } from './icons/logout';
import { SettingsIcon } from './icons/settings';
import { TransactionsIcon } from './icons/transactions';
import { WalletIcon } from './icons/wallet';

const items = [
  {
    title: paths['/'].label,
    url: paths['/'].getHref(),
    icon: HomeIcon,
  },
  {
    title: paths['transactions'].label,
    url: paths['transactions'].getHref(),
    icon: TransactionsIcon,
  },
  {
    title: paths['invoices'].label,
    url: paths['invoices'].getHref(),
    icon: InvoicesIcon,
  },
  {
    title: paths['my-wallets'].label,
    url: paths['my-wallets'].getHref(),
    icon: WalletIcon,
  },
  {
    title: paths['settings'].label,
    url: paths['settings'].getHref(),
    icon: SettingsIcon,
  },
];

const footerItems = [
  {
    title: paths['help'].label,
    url: paths['help'].getHref(),
    icon: HelpIcon,
  },
];

export function AppSidebar() {
  const { isActive } = useActivePath();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = usePostUsersLogout({
    mutation: {
      onSuccess(_data) {
        queryClient.clear();

        toast.success(
          // data.message || // No message returned from API
          'Logged out successfully.',
        );

        router.replace(paths['sign-in'].getHref());
      },
      onError(error) {
        toast.error(
          // error.response?.data?.message || // No message returned from API
          error.message || 'An error occurred during logout.',
        );
      },
    },
  });

  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <Image
          src="/images/logo.png"
          alt="Nodelabs Logo"
          width={100}
          height={50}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                size={'lg'}
              >
                <Link href={item.url}>
                  <item.icon className="text-inherit" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                size={'lg'}
              >
                <Link href={item.url}>
                  <item.icon className="text-inherit" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton
              size={'lg'}
              onClick={() => logout()}
              disabled={isPending}
              aria-busy={isPending}
            >
              {isPending ? (
                <Loader2 className="mx-auto animate-spin text-inherit" />
              ) : (
                <>
                  <LogoutIcon className="text-inherit" />
                  <span>Logout</span>
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
