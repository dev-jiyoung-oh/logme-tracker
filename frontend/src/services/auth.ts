import { api } from './api';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/auth';

// 로그인
export const login = (data: LoginRequest): Promise<LoginResponse> =>
  api.post('/auth/login', data).then((res) => res.data);

// 회원가입
export const signup = (data: SignupRequest): Promise<SignupResponse> =>
  api.post('/auth/signup', data).then((res) => res.data);
