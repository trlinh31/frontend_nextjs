import { getTokenCookie } from '@/utils/cookies';
import http from '@/utils/http';

const categoryApiRequest = {
  getAll: async (page: number) => {
    try {
      const token = await getTokenCookie();
      const response = await http.post(`/admin/category/list?page=${page}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      const responseData = await response?.json();
      return responseData;
    } catch (e) {
      console.error('Error:', e);
      return [];
    }
  },
  getAllAndParent: async () => {
    try {
      const token = await getTokenCookie();
      const response = await http.get(`/admin/category/list`, { headers: { Authorization: `Bearer ${token}` } });
      return response?.responseData;
    } catch (e) {
      console.error('Error:', e);
      return [];
    }
  },
  getAllParents: async () => {
    try {
      const token = await getTokenCookie();
      const response = await http.get(`/admin/category/listParents`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
      return response?.responseData;
    } catch (e) {
      console.error('Error:', e);
      return [];
    }
  },
  getDetail: async (id: string) => {
    try {
      const token = await getTokenCookie();
      const response = await http.get(`/admin/category/update/${id}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
      return response?.responseData;
    } catch (e) {
      console.error('Error:', e);
      return null;
    }
  },
  createOrUpdate: async (data: any) => {
    try {
      const token = await getTokenCookie();
      const response = await http.post(`/admin/category/save`, data, {
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
        `/admin/category/delete/${id}`,
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

export default categoryApiRequest;
