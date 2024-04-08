import RegisterForm from '@/app/(auth)/register/components/register.form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập',
};

export default function SignInPage() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
