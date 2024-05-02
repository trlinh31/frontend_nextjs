'use server';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const setTokenCookie = (token: string) => {
  Cookies.set('accessToken', token, { expires: 7 }); // Set the token with a 7-day expiration
};

export const getTokenCookie = async () => {
  const token = await getCookie('accessToken', { cookies });
  return token;
};

export const removeTokenCookie = () => {
  Cookies.remove('accessToken');
};
