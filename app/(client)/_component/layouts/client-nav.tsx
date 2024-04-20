'use client';
import UserNav from '@/components/layouts/user-nav';
import { Button } from '@/components/ui/button';
import { decodeToken } from '@/utils/sessionToken';
import { User } from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ClientNav() {
  const [user, setUser] = useState({});
  const accessToken = Cookies.get('accessToken');

  const decode = async () => {
    if (accessToken) {
      const userDecode = await decodeToken(accessToken);
      setUser(userDecode!!);
    }
  };

  useEffect(() => {
    decode();
  }, []);

  return (
    <>
      <UserNav user={user} />
    </>
  );

  // return (
  //   <>
  //     {!accessToken ? (
  //       <Link href={'/login'}>
  //         <User color='black' />
  //       </Link>
  //     ) : (
  //       <UserNav user={user} />
  //     )}
  //   </>
  // );
}
