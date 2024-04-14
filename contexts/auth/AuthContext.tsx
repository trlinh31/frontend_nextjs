'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from '@/utils/sessionToken';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext({
  roles: [],
});

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [userRoles, setUserRoles] = useState<any>([]);
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (accessToken) {
      const decodedToken = decodeToken(accessToken);
      if (decodedToken?.roles) {
        setUserRoles(decodedToken.roles);
      }
    }
  }, [accessToken]);

  return <AuthContext.Provider value={{ roles: userRoles }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
