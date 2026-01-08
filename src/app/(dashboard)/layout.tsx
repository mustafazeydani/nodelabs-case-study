import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { AppSidebar } from '@/components/app-sidebar';
import { BellIcon } from '@/components/icons/bell';
import { SearchIcon } from '@/components/icons/search';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getQueryClient } from '@/lib/react-query';

import { getGetUsersProfileQueryOptions } from '@/api/generated/react-query/user';

import { ClientTitle } from './_components/client-title';
import { UserDropdown } from './_components/user-dropdown';

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getGetUsersProfileQueryOptions());

  const deydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={deydratedState}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="grow space-y-4 overflow-hidden p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-muted-foreground lg:hidden" />
              <ClientTitle />
            </div>

            <div className="flex items-center gap-6 lg:gap-12">
              <SearchIcon className="text-muted-foreground size-5" />
              <BellIcon className="text-muted-foreground size-5" />
              <UserDropdown />
            </div>
          </div>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
};

export default DashboardLayout;
