const API_BASE_URL = 'http://localhost:8081'; // Replace with your API base URL

const http = {
  get: async (url: string, options: any = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      const status = response.status;
      return { responseData, status };
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  },
  post: async (url: string, data?: any, options: any = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    } catch (error) {
      console.error('Error posting data:', error);
      return null;
    }
  },
};

export default http;
