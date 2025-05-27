import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (credentials) => {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials);
      setToken(data.token);
      setUser(data.user);
      return data;
    },
    onError: (err) => {
      // optional: 에러 처리 로직
      console.error('로그인 실패', err);
    },
  });
}
