import { getTokenCookie } from '@/utils/cookies';
import http from '@/utils/http';

const productApiRequest = {
  getAll: async (keyword: string = '', page: number) => {
    try {
      const token = await getTokenCookie();
      const response = await http.post(`/admin/product/list?keyword=${keyword}&page=${page}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      const responseData = await response?.json();
      return responseData;
    } catch (e) {
      console.error('Error:', e);
      return [];
    }
  },
  getDetail: async (id: string) => {
    try {
      const token = await getTokenCookie();
      const response = await http.get(`/admin/product/update/${id}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
      return response?.responseData;
    } catch (e) {
      console.error('Error:', e);
      return null;
    }
  },
  getByName: async (keyword: string) => {
    try {
      const token = await getTokenCookie();
      const response = await http.get(`/admin/product/api/list?keyword=${keyword}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      return response?.responseData;
    } catch (e) {
      console.error('Error:', e);
      return [];
    }
  },
  createOrUpdate: async (data: any) => {
    try {
      const token = await getTokenCookie();
      const response = await http.post(`/admin/product/save`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.status;
    } catch (e) {
      console.error('Error:', e);
      return 400;
    }
  },
  delete: async (id: string) => {
    try {
      const token = await getTokenCookie();
      const response = await http.post(
        `/admin/product/delete/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        }
      );
      return response?.status;
    } catch (e) {
      console.error('Error:', e);
      return 400;
    }
  },
};

export default productApiRequest;
