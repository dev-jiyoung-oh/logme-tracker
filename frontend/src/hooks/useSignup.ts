import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { SignupRequest, SignupResponse } from '@/types/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

export function useSignup() {
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation<SignupResponse, AxiosError<ApiError>, SignupRequest>({
    mutationFn: (credentials) =>
      api.post<SignupResponse>('/auth/signup', credentials).then((res) => res.data),

    onSuccess: (data) => {
      // 가입 직후 자동 로그인 처리
      setUser(data.user);
      setToken(data.token);
    },
  });
}
