'use client';

import { slideToken } from '@/api/auth';
import { checkTokenValidity } from '@/utils/authenticate';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const handleTest = async () => {
    const { accessToken, refreshToken } = await slideToken();
    Cookies.set('accessToken', accessToken, { expires: 36000 });
    Cookies.set('refreshToken', refreshToken, { expires: 36000 });
  };
  return (
    <div>
      <button onClick={handleTest}>Click</button>
    </div>
  );
}
