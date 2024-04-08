'use server';
import { revalidateTag } from 'next/cache';
import { ProductSchemaType } from '@/lib/form-schema';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getAllProducts = async (page = 0) => {
  const url = `${BASE_URL}/product/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const getProductDetails = async (productId: string) => {
  const url = `${BASE_URL}/product/update/${productId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const { product } = await response.json();
    return { data: product };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return null;
  }
};

export const createOrUpdateProduct = async (product: ProductSchemaType) => {
  const url = `${BASE_URL}/product/save`;
  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('products');
  }
};

export const deleteProduct = async (id: string) => {
  const url = `${BASE_URL}/product/delete/${id}`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('products');
  }
};
