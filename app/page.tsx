import { URL_DASHBOARD } from '@/constants/url';
import { redirect } from 'next/navigation';

export default async function Home() {
  return redirect(URL_DASHBOARD);
}
