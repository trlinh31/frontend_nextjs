'use server';
import { CategorySchemaType } from '@/lib/form-schema';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/api';

export const getAllCategories = async (page = 0) => {
  const url = `${BASE_URL}/category/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
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

export const getAllCategoriesAndParent = async () => {
  const url = `${BASE_URL}/category/list`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      next: { tags: ['categories'] },
      cache: 'no-store',
    });
    const categories = await response.json();
    return { data: categories };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

export const getAllCategoryParents = async () => {
  const url = `${BASE_URL}/category/listParents`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getDetailCategory = async (id: string) => {
  const url = `${BASE_URL}/category/update/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const createOrUpdateCategory = async (data: CategorySchemaType) => {
  const url = `${BASE_URL}/category/save`;
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
    console.log(error);
  } finally {
    revalidateTag('products');
  }
};

export const deleteCategory = async (id: string) => {
  const url = `${BASE_URL}/category/delete/${id}`;
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
    console.log(error);
  } finally {
    revalidateTag('products');
  }
};
