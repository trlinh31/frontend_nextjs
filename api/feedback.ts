'use server';
import { revalidateTag } from 'next/cache';
import { FeedbackSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/api';

export const getAllFeedbacks = async (page = 0) => {
  const url = `${BASE_URL}/rating/list?page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      next: { tags: ['feedbacks'] },
      cache: 'no-store',
    });

    const { content, totalPages } = await response.json();
    return { data: content, totalPages };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null, totalPages: 0 };
  }
};

export const getProductFeedbacks = async (id: string) => {
  const url = `${BASE_URL}/rating/listByProduct/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      cache: 'no-store',
    });

    const content = await response.json();
    return { data: content };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

export const createRating = async (rating: any) => {
  const url = `${BASE_URL}/rating/create`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(rating),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('groups');
  }
};
