'use server';
import { revalidateTag } from 'next/cache';
import { CustomerSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getAllCustomers = async (page = 0) => {
  const url = `${BASE_URL}/customer/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      next: { tags: ['customers'] },
      cache: 'no-store',
    });

    const { content, totalPages } = await response.json();
    return { data: content, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null, totalPages: 0 };
  }
};

export const getCustomerDetails = async (id: string) => {
  const url = `${BASE_URL}/customer/update/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      cache: 'no-store',
    });

    const customer = await response.json();
    return { data: customer };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return null;
  }
};

export const createOrUpdateCustomer = async (customer: CustomerSchemaType) => {
  const url = `${BASE_URL}/customer/save`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('customers');
  }
};

export const deleteCustomer = async (id: string) => {
  const url = `${BASE_URL}/customer/delete/${id}`;
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
    revalidateTag('customers');
  }
};
