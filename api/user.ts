'use server';
import { revalidateTag } from 'next/cache';
import { ProductSchemaType } from '@/lib/form-schema';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getAllProducts = async (page = 0, accessToken: string) => {
  const url = `${BASE_URL}/product/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ['products'] },
      cache: 'no-store',
    });
    const { content, totalPages } = await response.json();
    return { data: content, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null, totalPages: 0 };
  }
};
