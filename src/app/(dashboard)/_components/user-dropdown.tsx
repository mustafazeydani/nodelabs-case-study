'use client';
import Image from 'next/image';

import { ChevronDownIcon } from '@/components/icons/chevron-down';
import { Button } from '@/components/ui/button';

import { UserResponse } from '@/api/generated/models';
import { useGetUsersProfile } from '@/api/generated/react-query/user';

export const UserDropdown = () => {
  const { data } = useGetUsersProfile();

  // There is a type mismatch between the generated types from the OpenAPI spec and the actual API response it needs to be corrected.
  const modifiedData = data as
    | { data: UserResponse; success: boolean }
    | undefined;

  return (
    <Button variant={'ghost'} className="bg-muted rounded-full" size={'lg'}>
      <Image
        className="rounded-full"
        src={
          'https://www.gravatar.com/avatar/' +
          modifiedData?.data.email +
          '?d=identicon'
        }
        alt="User Avatar"
        width={24}
        height={24}
      />
      <span>{modifiedData?.data.fullName}</span>
      <ChevronDownIcon className="text-foreground ml-4 size-2" />
    </Button>
  );
};
