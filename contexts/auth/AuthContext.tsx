'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from '@/utils/sessionToken';
import { slideToken } from '@/api/auth';

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
  const [timeRemaining, setTimeRemaining] = useState<number>();

  useEffect(() => {
    // Lấy giá trị của token từ cookies
    if (accessTokenInCookie) {
      const decodedToken = decodeToken(accessTokenInCookie);
      const tokenExpirationTime = decodedToken?.exp;
      const tokenInitTime = decodedToken?.iat;

      if (tokenExpirationTime && tokenInitTime) {
        const currentTimeInMilliseconds = new Date().getTime();
        const expirationTimeInMillisecond = tokenExpirationTime * 1000;
        const timeRemainingInSeconds = Math.floor((expirationTimeInMillisecond - currentTimeInMilliseconds) / 1000);
        setTimeRemaining(timeRemainingInSeconds);
      }
    }
  }, []);

  const handleRefreshToken = async () => {
    if (accessTokenInCookie) {
      const { accessToken, refreshToken } = await slideToken(accessTokenInCookie);
      Cookies.set('accessToken', accessToken, { expires: 3600 });
      Cookies.set('refreshToken', refreshToken, { expires: 3600 });
      console.log('Refresh token successfully');
    }
  };

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining !== undefined && timeRemaining <= 0) {
      handleRefreshToken();
    } else if (timeRemaining !== null && timeRemaining !== undefined) {
      console.log('Thời gian còn lại:', timeRemaining);
    }
  }, [timeRemaining]);

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
