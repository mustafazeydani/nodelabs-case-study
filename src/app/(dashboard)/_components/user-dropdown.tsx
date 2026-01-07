'use client';
import Image from 'next/image';

import { ChevronDownIcon } from '@/components/icons/chevron-down';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useGetUsersProfile } from '@/api/generated/react-query/user';

export const UserDropdown = () => {
  const { data } = useGetUsersProfile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="bg-muted rounded-full">
          <Image
            className="rounded-full"
            src={
              'https://www.gravatar.com/avatar/' + data?.email + '?d=identicon'
            }
            alt="User Avatar"
            width={24}
            height={24}
          />
          <span>{data?.fullName}</span>
          <ChevronDownIcon className="text-foreground size-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
