'use client';

import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

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

const signInFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});
type SignInFormValues = z.infer<typeof signInFormSchema>;

export const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    console.log(data);
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

        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <Button variant={'outline'} className="w-full">
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
            href="/sign-up"
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
