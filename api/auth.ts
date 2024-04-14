'use server';
import { LoginSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_URL_AUTH_BACKEND;

export const login = async (data: LoginSchemaType) => {
  const url = `${BASE_URL}/authenticate`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { access_token, refresh_token } = await response.json();
    return { accessToken: access_token, refreshToken: refresh_token, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { accessToken: null, refreshToken: null };
  }
};

export const slideToken = async (token: string) => {
  const url = `${BASE_URL}/refresh-token`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { access_token, refresh_token } = await response.json();
    return { accessToken: access_token, refreshToken: refresh_token, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { accessToken: null, refreshToken: null };
  }
};
