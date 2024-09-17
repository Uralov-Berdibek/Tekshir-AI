// app/auth/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { loginUser } from '@/lib/api';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

const formSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormType = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (values: LoginFormType) => {
    setLoading(true);
    try {
      const response = await loginUser(values);
      setUser({ username: response.data.username });
      router.push('/conversation'); // Redirect to conversation page after success
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-2'>
            <Button type='submit' disabled={loading} className='w-full'>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Link href='/' className='text-blue-500 underline'>
              <Button variant='outline' className='bg-red'>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
