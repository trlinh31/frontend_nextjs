'use client';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from '@/utils/sessionToken';
import { ROLE_CASHIER } from '@/constants/roles';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/auth/AuthContext';

const cashierPath = ['/admin/transaction', '/admin/product'];

export default function AuthGuard({ children }: any) {
  const { roles } = useAuth();
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (roles && roles.length == 1 && roles.includes(ROLE_CASHIER) && !cashierPath.includes(pathname)) {
      router.push('/admin/dashboard');
      toast({
        variant: 'destructive',
        title: 'Unauthorized',
        description: 'You are not authorized to access this page',
      });
    }
  }, [pathname, router]);

  return <>{children}</>;
}
