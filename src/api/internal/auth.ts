import { useMutation } from '@tanstack/react-query';
import { XiorError } from 'xior';

import { MutationConfig } from '@/lib/react-query';

import { customInternalInstance } from '../mutator/internal-custom-instance';

type SetSessionCookieResponse = {
  success: boolean;
};

const setSessionCookie = async (
  token: string,
): Promise<SetSessionCookieResponse> => {
  const res = await customInternalInstance<SetSessionCookieResponse>({
    url: '/api/auth/session',
    method: 'POST',
    data: { token },
  });
  return res;
};

type SetSessionCookieOptions = {
  mutation?: MutationConfig<typeof setSessionCookie, XiorError>;
};

export const useSetSessionCookie = ({
  mutation,
}: SetSessionCookieOptions = {}) => {
  return useMutation({
    mutationFn: setSessionCookie,
    ...mutation,
  });
};

type LogoutSessionResponse = {
  success: boolean;
};

const logoutSession = async (_void?: void): Promise<LogoutSessionResponse> => {
  const res = await customInternalInstance<LogoutSessionResponse>({
    url: '/api/auth/logout',
    method: 'POST',
  });
  return res;
};

type LogoutSessionOptions = {
  mutation?: MutationConfig<typeof logoutSession, XiorError>;
};

export const useLogoutSession = ({ mutation }: LogoutSessionOptions = {}) => {
  return useMutation({
    mutationFn: logoutSession,
    ...mutation,
  });
};
