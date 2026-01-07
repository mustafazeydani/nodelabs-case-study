import { setCookie } from 'cookies-next/client';

export const setAccessTokenCookie = (
  token: string,
  expiresInSeconds: number,
) => {
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + expiresInSeconds);

  setCookie('accessToken', token, { expires, path: '/' });
};
