'use server';
import { revalidateTag } from 'next/cache';
import { ProductSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/api';

export const getAllProducts = async (keyword = '', page = 0) => {
  const url = `${BASE_URL}/product/list?keyword=${keyword}&page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
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

export const getProductDetails = async (id: string) => {
  const url = `${BASE_URL}/product/update/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      cache: 'no-store',
    });

    const { product } = await response.json();
    return { data: product };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return { data: null };
  }
};

export const getProductsByName = async (keyword: string) => {
  const url = `${BASE_URL}/product/api/list?keyword=${keyword}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      cache: 'no-store',
    });

    const product = await response.json();
    return { data: product };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return { data: null };
  }
};

export const createOrUpdateProduct = async (data: ProductSchemaType) => {
  const url = `${BASE_URL}/product/save`;
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
    revalidateTag('products');
  }
};

export const deleteProduct = async (id: string) => {
  const url = `${BASE_URL}/product/delete/${id}`;
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
    revalidateTag('products');
  }
};
