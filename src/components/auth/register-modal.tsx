import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import ButtonAuth from '../shared/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Modal from '../shared/modal';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RegisterModal() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
  });

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const handleNextStep = () => {
    setStep(2);
  };

  const bodyContent =
    step === 1 ? (
      <RegisterStep1 setData={setData} setStep={handleNextStep} />
    ) : (
      <RegisterStep2
        data={data}
        onSuccess={() => {
          toast.success('You have been registered! Please sign in.');
          onToggle();
        }}
      />
    );

  const footer = (
    <div className='text-neutral-400 text-center mb-4'>
      <p>
        Already have an account?{' '}
        <span className='text-black cursor-pointer hover:underline' onClick={onToggle}>
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalSteps={2}
    />
  );
}

function RegisterStep1({
  setData,
  setStep,
}: {
  setData: (data: any) => void;
  setStep: () => void;
}) {
  const [error, setError] = useState('');
  const form = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (formData: any) => {
    try {
      // Форматирование даты рождения
      const dateOfBirth = new Date(formData.dateOfBirth);
      const formattedDate = `${String(dateOfBirth.getDate()).padStart(2, '0')}.${String(
        dateOfBirth.getMonth() + 1,
      ).padStart(2, '0')}.${dateOfBirth.getFullYear()}`;

      const formattedData = {
        ...formData,
        dateOfBirth: formattedDate, // Преобразуем в формат DD.MM.YYYY
      };

      // Отправка данных на сервер
      const response = await axios.post('http://localhost:8088/user/auth/sign-up', formattedData);

      // Если регистрация успешна, обрабатываем ответ
      if (response.data.status === 'SUCCESS') {
        const { accessToken, refreshToken, user } = response.data.data;

        // Сохраняем токены (можно использовать localStorage или другой метод хранения)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Сохраняем данные пользователя в состояние
        setData({
          ...formattedData,
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
        });

        // Переход на следующий шаг регистрации
        setStep(); // Или можете автоматически авторизовать пользователя и редиректить
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Произошла ошибка при регистрации');
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-4 px-12' onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className='flex justify-between items-center gap-2'>
          <FormField
            control={form.control}
            name='fullName'
            rules={{ required: 'Fullname is required' }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter your full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            rules={{ required: 'Phone number is required' }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter your phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='email'
          rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Email address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between items-center gap-2'>
          <FormField
            control={form.control}
            name='password'
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter your gender' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='dateOfBirth'
          rules={{ required: 'Date of birth is required' }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Enter your date of birth' type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonAuth label={'Next'} type='submit' secondary fullWidth padding />
      </form>
    </Form>
  );
}

function RegisterStep2({ data, onSuccess }: { data: any; onSuccess: () => void }) {
  const [error, setError] = useState('');
  const [time, setTime] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const form = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        setCanResend(true);
        clearInterval(timer);
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (formData: any) => {
    try {
      await axios.get('http://localhost:8088/user/auth/verify', {
        params: { code: formData.confirmationCode },
      });
      onSuccess(); // Redirect to dashboard
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const resendCode = async () => {
    try {
      await axios.post('http://localhost:8088/user/auth/forgot-password', null, {
        params: { email: data.email },
      });
      toast.info('Activation code resent to your email.');
      setCanResend(false);
      setTime(60);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-4 px-12' onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name='confirmationCode'
          rules={{ required: 'Activation code is required' }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Confirmation Code' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='text-neutral-400 text-center mb-4'>
          <p onClick={resendCode}>
            Resend code in{' '}
            {canResend ? (
              <span className='underline cursor-pointer'>email</span>
            ) : (
              `${time} seconds`
            )}
            .
          </p>
        </div>

        <ButtonAuth label={'Register'} type='submit' secondary fullWidth padding />
      </form>
    </Form>
  );
}
