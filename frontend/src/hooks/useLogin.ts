import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';
import { LoginRequest, LoginResponse } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: (credentials) =>
      api.post<LoginResponse>('/auth/login', credentials).then((res) => res.data),

    onSuccess: (data) => {
      // user, token 값을 zustand store에 저장
      setUser(data.user);
      setToken(data.token);
    },
  });
}
