'use client';

import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { paths } from '@/config/paths';

import {
  getGetUsersProfileQueryKey,
  PostUsersLoginMutationBody,
  usePostUsersLogin,
} from '@/api/generated/react-query/user';
import { postUsersLoginBody } from '@/api/generated/zod/user.zod';
import { useSetSessionCookie } from '@/api/internal/auth';

export const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(postUsersLoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const queryClient = useQueryClient();

  const { mutate: setSessionCookie, isPending: isSettingSessionCookie } =
    useSetSessionCookie({
      mutation: {
        onError(error) {
          toast.error(
            error.response?.data?.message ||
              error.message ||
              'An error occurred while setting session cookie.',
          );
        },
      },
    });

  const { mutate: login, isPending: isLoggingIn } = usePostUsersLogin({
    mutation: {
      onSuccess(data) {
        queryClient.setQueryData(getGetUsersProfileQueryKey(), data.data?.user);

        toast.success(data.message || 'Successfully signed in!');

        setSessionCookie(data.data?.accessToken || '');
      },
      onError(error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'An error occurred during sign in.',
        );
      },
    },
  });

  const isPending = isLoggingIn || isSettingSessionCookie;

  const onSubmit: SubmitHandler<PostUsersLoginMutationBody> = (data) => {
    login({ data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="example@gmail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin text-inherit" />
          ) : (
            'Sign In'
          )}
        </Button>

        <Button type="button" variant={'outline'} className="w-full">
          <Image
            src="/icons/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="inline size-5"
          />
          Sign in with Google
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          Don't have an account?{' '}
          <Link
            href={paths['/sign-up'].getHref()}
            className="text-foreground hover:text-foreground/70 relative cursor-pointer transition-colors"
          >
            <Image
              src="/icons/curve.svg"
              alt="Curve Icon"
              width={48}
              height={48}
              className="absolute right-0 -bottom-3 left-0"
            />
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};
