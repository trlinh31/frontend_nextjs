'use server';
import { revalidateTag } from 'next/cache';
import { UserSchemaType } from '@/lib/form-schema';

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
const LIMIT = process.env.NEXT_PUBLIC_PAGE_SIZE;

export const getAll = async (page: string | string[] | number, searchKey: string | string[] | number) => {
  const res = await fetch(`${BASE_URL}/users?_page=${page}&_limit=${LIMIT}&name_like=${searchKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['users'] },
  });
  return res;
};

export const create = async (data: UserSchemaType) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  revalidateTag('users');
  return await res.json();
};

export const getU = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['users'] },
  });
  return await res.json();
};

export const edit = async (id: string, data: UserSchemaType) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  revalidateTag('users');
  return await res.json();
};

export const deleteU = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  revalidateTag('users');
  return await res.json();
};
