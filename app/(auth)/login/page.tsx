import LoginForm from '@/app/(auth)/login/components/login.form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập',
};

export default function SignInPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
