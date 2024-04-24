import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const saveToken = async (accessToken: string, refeshToken: string) => {
  if (typeof window !== 'undefined') {
    await Cookies.set('accessToken', accessToken, { expires: 3600 });
    await Cookies.set('refreshToken', refeshToken, { expires: 3600 });
  }
};

export const deleteToken = async () => {
  if (typeof window !== 'undefined') {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
};

type DecodedToken = {
  exp: number;
  iat: number;
  sub: string;
  roles: string[];
};
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decode = jwt.decode(token) as DecodedToken;
    return { exp: decode.exp, iat: decode.iat, sub: decode.sub, roles: decode.roles };
  } catch {
    return null;
  }
};
