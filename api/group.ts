'use server';
import { revalidateTag } from 'next/cache';
import { GroupSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/api';

export const getAllGroups = async () => {
  const url = `${BASE_URL}/group/list`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      next: { tags: ['groups'] },
      cache: 'no-store',
    });
    const groups = await response.json();
    return { data: groups };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

export const getGroupDetails = async (id: string) => {
  const url = `${BASE_URL}/group/update/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      cache: 'no-store',
    });

    const group = await response.json();
    return { data: group };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return null;
  }
};

export const createOrUpdateGroup = async (group: GroupSchemaType) => {
  const url = `${BASE_URL}/group/save`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(group),
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

export const deleteGroup = async (id: string) => {
  const url = `${BASE_URL}/group/delete/${id}`;
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
    revalidateTag('groups');
  }
};
