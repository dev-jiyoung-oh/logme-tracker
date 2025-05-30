import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';
import { isEmailValid } from '@/utils/validate';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();

  // 에러 메시지 처리
  let errorMsg = '';
  if (error) {
    const axiosError = error as AxiosError<ApiError>;
    errorMsg = axiosError.response?.data?.message || '에러가 발생했습니다. 잠시 후 다시 시도해주세요';
  } else {
    errorMsg = '';
  }

  // 버튼 활성화 조건
  const isFormValid =
    isEmailValid(email) && password.length > 0;

  // TODO? 키 입력하면 에러 메시지 나왔던 거 삭제

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password }, { onSuccess: () => navigate('/') });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={!isFormValid || isPending}
        className="w-full p-2 rounded bg-blue-500 text-white transition-colors duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:outline-2 hover:outline-blue-300 disabled:bg-gray-500 disabled:hover:outline-none disabled:focus:outline-none disabled:cursor-not-allowed"
      >
        {isPending ? '로딩중...' : '로그인'}
      </button>
      <p>
        회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </p>
    </form>
  );
}
