// import { BASE_URL } from '@/api';
// import { AppContext, useContextApp } from '@/contexts/AppContext';
// import { useContext } from 'react';
// import Cookies from 'js-cookie';

// class SessionToken {
//   private token = '';
//   private _expiresAt = new Date().toISOString();

//   get value() {
//     return this.token;
//   }
//   set value(token: string) {
//     if (typeof window === 'undefined') {
//       throw new Error('Cannot set token on server side');
//     }
//     this.token = token;
//   }
//   get expiresAt() {
//     return this._expiresAt;
//   }
//   set expiresAt(expiresAt: string) {
//     if (typeof window === 'undefined') {
//       throw new Error('Cannot set token on server side');
//     }
//     this._expiresAt = expiresAt;
//   }
// }

// export const clientSessionToken = new SessionToken();

// const http = {
//   getToken: () => {
//     return Cookies();
//   },
//   get: async (url: string, options?: any) => {
//     try {
//       // const { accessToken } = useContext(AppContext);
//       const config = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${clientSessionToken.value}`,
//         },
//         ...options,
//       };

//       const response = await fetch(BASE_URL + url, config);
//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.message || 'Something went wrong!');
//       }

//       return responseData;
//     } catch (error) {
//       console.error('Error when GET data:', error);
//       throw error;
//     }
//   },
//   post: async (url: string, data?: any, options?: any) => {
//     try {
//       const config = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${clientSessionToken.value}`,
//         },
//         ...options,
//       };

//       if (data) {
//         config.body = JSON.stringify(data);
//       }

//       const response = await fetch(BASE_URL + url, config);
//       if (response.ok) {
//         const responseData = await response.json();
//         const responseStatus = await response.status;
//         return { data: responseData, status: responseStatus };
//       }
//       return { data: null, status: response.status, token:  };
//     } catch (error) {
//       console.error('Error when POST data:', error);
//       throw error;
//     }
//   },
// };

// export default http;
