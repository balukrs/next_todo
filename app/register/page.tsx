import RegisterForm from '@/components/RegisterForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/home');
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default Register;
