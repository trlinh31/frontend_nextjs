'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema, LoginSchemaType } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: LoginSchemaType) => {
    console.log(values);
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
                      <FormLabel>Tên đăng nhập:</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Mật khẩu:</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input type={showPassword ? 'text' : 'password'} {...field} />
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
                <Button type='submit'>Lưu</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
