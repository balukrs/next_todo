'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useFetch } from '../utils/hooks/useFetch';
import { BeatLoader } from 'react-spinners';
import Notifications from '../utils/Notification';

type FormValues = {
  password: string;
  email: string;
  name: string;
  confirmPassword: string;
};

function Register() {
  const router = useRouter();
  const { fetchData, isLoading } = useFetch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch('password');

  const onSubmit = async (data: FormValues) => {
    const { name, email, password, confirmPassword } = data;
    const response = await fetchData('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    if (response?.success) {
      Notifications(response.message, 'success');
      router.push('/');
    } else {
      Notifications(response.message, 'error');
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className=" bg-gray-900 p-4 border-t-4 border-t-blue-600 rounded-lg">
        <h1 className="mb-2">Register</h1>
        <form className="flex flex-col gap-2.5" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Name"
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          <input
            placeholder="Email"
            type="text"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
            })}
          />
          <input
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Must be at least 6 characters' },
            })}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          <button
            className=" bg-blue-900 rounded py-2 mt-2 cursor-pointer font-bold"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader /> : 'Submit'}
          </button>
          {(errors?.name?.message ||
            errors?.email?.message ||
            errors?.password?.message ||
            errors?.confirmPassword?.message) && (
            <span className=" text-red-400">
              {errors?.name?.message ||
                errors?.email?.message ||
                errors?.password?.message ||
                errors?.confirmPassword?.message ||
                'Error Occured'}
            </span>
          )}
          <Link href="/" className="text-sm text-right">
            Already have an Account ? <span>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
