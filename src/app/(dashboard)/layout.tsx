import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { AppSidebar } from '@/components/app-sidebar';
import { BellIcon } from '@/components/icons/bell';
import { SearchIcon } from '@/components/icons/search';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getQueryClient } from '@/lib/react-query';

import {
  getGetUsersProfileQueryKey,
  getUsersProfile,
} from '@/api/generated/react-query/user';

import { ClientTitle } from './_components/client-title';
import { UserDropdown } from './_components/user-dropdown';

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getGetUsersProfileQueryKey(),
    queryFn: getUsersProfile,
  });

  const deydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={deydratedState}>
      <SidebarProvider>
        <AppSidebar />
        <div className="grow space-y-4 p-8">
          <div className="flex items-center justify-between">
            <ClientTitle />

            <div className="flex items-center gap-12">
              <SearchIcon className="text-muted-foreground size-5" />
              <BellIcon className="text-muted-foreground size-5" />
              <UserDropdown />
            </div>
          </div>
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </HydrationBoundary>
  );
};

export default DashboardLayout;
