// app/auth/page.tsx
import Link from 'next/link';
import { Button } from '../../../components/ui/button';

export default function Auth() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col gap-2'>
        <Link href='/login' className='text-blue-500 underline'>
          <Button className='w-40'>Login</Button>
        </Link>
        <Link href='/register' className='text-blue-500 underline'>
          <Button className='w-40'>Register</Button>
        </Link>
      </div>
    </div>
  );
}
