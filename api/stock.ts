'use server';
import { revalidateTag } from 'next/cache';
import { TransactionSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/api';

export const getAllStocks = async (page = 0) => {
  const url = `${BASE_URL}/stock/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      next: { tags: ['stocks'] },
      cache: 'no-store',
    });

    const { content, totalPages } = await response.json();
    return { data: content, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null, totalPages: 0 };
  }
};

export const createStock = async (data: any) => {
  const url = `${BASE_URL}/stock/save`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('stocks');
  }
};
