'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from '@/utils/sessionToken';

interface AuthContextType {
  roles: string[];
}

const initialAuthContextValue: AuthContextType = {
  roles: [],
};

const AuthContext = createContext<AuthContextType>(initialAuthContextValue);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const accessTokenInCookie = Cookies.get('accessToken') ?? '';

  useEffect(() => {
    if (accessTokenInCookie) {
      const decodedToken = decodeToken(accessTokenInCookie);
      if (decodedToken?.roles) {
        setUserRoles(decodedToken.roles);
      }
    }
  }, [accessTokenInCookie]);

  return <AuthContext.Provider value={{ roles: userRoles }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
