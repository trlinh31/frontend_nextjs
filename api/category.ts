'use server';
import { CategorySchemaType } from '@/lib/form-schema';
import { revalidateTag } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getAllCategories = async (page = 0) => {
  const url = `${BASE_URL}/category/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['categories'] },
      cache: 'no-store',
    });
    const { content, totalPages } = await response.json();
    return { data: content, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null, totalPages: 0 };
  }
};

export const getAllCategoryParents = async () => {
  const url = `${BASE_URL}/category/listParents`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getDetailCategory = async (id: string) => {
  const url = `${BASE_URL}/category/update/${id}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const createOrUpdateCategory = async (data: CategorySchemaType) => {
  const url = `${BASE_URL}/category/save`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  } finally {
    revalidateTag('products');
  }
};

export const deleteCategory = async (id: string) => {
  const url = `${BASE_URL}/category/delete/${id}`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    revalidateTag('products');
  }
};
