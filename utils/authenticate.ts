'use server';
import { slideToken } from '@/api/auth';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

type DecodedToken = {
  exp: number;
  sub: string;
  roles: string[];
};
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decode = jwt.decode(token) as DecodedToken;
    return { exp: decode.exp, sub: decode.sub, roles: decode.roles };
  } catch {
    return null;
  }
};

export async function checkTokenValidity(accessTokenParam: string, refreshTokenParam: string) {
  if (!accessTokenParam && !refreshTokenParam) {
    // Token không tồn tại trong cookie, không cần làm gì
    return;
  }
  const decodedToken = decodeToken(accessTokenParam); // Hãy thay đổi hàm decodeToken bằng cách bạn muốn
  if (isTokenExpired(decodedToken)) {
    // Token hết hạn, gửi yêu cầu refresh token
    try {
      console.log('Refreshing token...');
      const { accessToken, refreshToken } = await slideToken(accessTokenParam); // Gửi yêu cầu refresh token lên backend
      // Lưu token mới vào cookie
      cookies().set('accessToken', accessToken, { path: '/' });
      cookies().set('refreshToken', refreshToken, { path: '/' });

      console.log('Refresh token successfully');
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }
}

function isTokenExpired(decodedToken: any) {
  // Kiểm tra xem token có hết hạn hay không
  const expirationTime = decodedToken?.exp * 1000; // Đổi giây thành mili giây
  const currentTime = Date.now();

  const remainingTime = expirationTime - currentTime;

  return remainingTime <= 600000;
}
