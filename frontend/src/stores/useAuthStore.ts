/* 
전역 인증 상태 관리
*/

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (u: User) => void;
  setToken: (t: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth', // localStorage key
      partialize: (state) => ({
        // 저장할 필드 한정
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
