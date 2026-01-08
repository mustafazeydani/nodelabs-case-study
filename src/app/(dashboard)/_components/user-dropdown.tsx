'use client';

import { ChevronDownIcon } from '@/components/icons/chevron-down';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
      <Avatar className="size-6">
        <AvatarImage
          src={
            'https://www.gravatar.com/avatar/' +
            modifiedData?.data.email +
            '?d=identicon'
          }
          alt={modifiedData?.data.fullName}
        />
        <AvatarFallback>
          {modifiedData?.data.fullName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <span>{modifiedData?.data.fullName}</span>
      <ChevronDownIcon className="text-foreground ml-4 size-2" />
    </Button>
  );
};
