'use server';
import { revalidateTag } from 'next/cache';
import { TransactionSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getAllTransactions = async (page = 0) => {
  const url = `${BASE_URL}/transaction/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      next: { tags: ['transactions'] },
      cache: 'no-store',
    });

    const { content, totalPages } = await response.json();
    return { data: content, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null, totalPages: 0 };
  }
};

export const createTransaction = async (data: TransactionSchemaType) => {
  const url = `${BASE_URL}/transaction/save`;
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
    revalidateTag('transactions');
  }
};

export const confirmTransaction = async (id: string) => {
  const url = `${BASE_URL}/transaction/confirm/${id}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('transactions');
  }
};

export const cancelTransaction = async (id: string) => {
  const url = `${BASE_URL}/transaction/cancel/${id}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('transactions');
  }
};

export const deleteTransaction = async (id: string) => {
  const url = `${BASE_URL}/transaction/delete/${id}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('transactions');
  }
};
