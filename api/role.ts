'use server';
import { revalidateTag } from 'next/cache';
import { RoleSchemaType } from '@/lib/form-schema';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getAllRoles = async () => {
  const url = `${BASE_URL}/role/list`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      next: { tags: ['roles'] },
      cache: 'no-store',
    });
    const roles = await response.json();
    return { data: roles };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: null };
  }
};

export const getRoleDetails = async (id: string) => {
  const url = `${BASE_URL}/role/update/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      cache: 'no-store',
    });

    const { role } = await response.json();
    return { data: role };
  } catch (error) {
    console.error('Failed to fetch data', error);
    return null;
  }
};

export const createOrUpdateRole = async (role: RoleSchemaType) => {
  const url = `${BASE_URL}/role/save`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(role),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag('roles');
  }
};

export const deleteRole = async (id: string) => {
  const url = `${BASE_URL}/role/delete/${id}`;
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
    revalidateTag('roles');
  }
};
