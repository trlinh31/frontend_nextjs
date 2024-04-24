'use server';
import { revalidateTag } from 'next/cache';
import { TransactionSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/api';

export const getAllTransactions = async (keyword = '', page = 0) => {
  const url = `${BASE_URL}/transaction/list?keyword=${keyword}&page=${page}`;

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

export const createTransaction = async (data: any) => {
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

export const getTransactionDetails = async (id: string) => {
  const url = `${BASE_URL}/transaction/update/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      cache: 'no-store',
    });

    const transaction = await response.json();
    return { data: transaction };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return { data: null };
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

export const getOrderHistory = async (username: string) => {
  const url = `${BASE_URL}/transaction/order?username=${username}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    const order = await response.json();
    return { data: order };
  } catch (error) {
    console.error(error);
    return { data: null };
  }
};
