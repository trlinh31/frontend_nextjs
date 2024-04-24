'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema, LoginSchemaType } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { login } from '@/api/auth';
import { saveToken } from '@/utils/sessionToken';
import { URL_DASHBOARD } from '@/constants/url';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: 'linh1',
      password: '123123',
    },
  });

  const handleShowHidePassword = (e: any) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: LoginSchemaType) => {
    try {
      const { accessToken, refreshToken, status } = await login(values);

      if (status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Đăng nhập thất bại',
          description: 'Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu',
        });
        return;
      }

      await saveToken(accessToken, refreshToken);
      router.push(URL_DASHBOARD);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-[600px] max-w-full shadow-md bg-white py-[64px] px-[32px]'>
        <div className='space-y-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                console.log(error);
              })}
              className='space-y-8'
              autoComplete='off'>
              <div className='grid grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>Tên đăng nhập:</FormLabel>
                      <FormControl>
                        <Input className='text-gray-800' {...field} />
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
                      <FormLabel className='text-gray-800'>Mật khẩu:</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input type={showPassword ? 'text' : 'password'} className='text-gray-800' {...field} />
                          <button className='absolute top-1/2 right-3 translate-y-[-50%] text-gray-400' onClick={handleShowHidePassword}>
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid'>
                <Button type='submit'>Đăng nhập</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
