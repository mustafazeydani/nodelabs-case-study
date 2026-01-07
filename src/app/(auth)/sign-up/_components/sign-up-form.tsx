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
import { paths } from '@/config/paths';

const signUpFormSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  password: z.string(),
});
type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          Create Account
        </Button>

        <Button variant={'outline'} className="w-full">
          <Image
            src="/icons/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="inline size-5"
          />
          Sign up with Google
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <Link
            href={paths['/sign-in'].getHref()}
            className="text-foreground hover:text-foreground/70 relative cursor-pointer transition-colors"
          >
            <Image
              src="/icons/curve.svg"
              alt="Curve Icon"
              width={48}
              height={48}
              className="absolute right-0 -bottom-3 left-0"
            />
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
};
