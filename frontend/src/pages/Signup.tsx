import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '@/hooks/useSignup';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';
import { isEmailValid } from '@/utils/validate';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();
  const { mutate, isPending, error } = useSignup();

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
    isEmailValid(email) && password.length > 0 && nickname.length > 0;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password, nickname },
      { onSuccess: () => navigate('/') }, // 가입 + 자동 로그인 후 홈으로
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold">회원가입</h1>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={!isFormValid || isPending}
        className="w-full p-2 rounded bg-blue-500 text-white transition-colors duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:outline-2 hover:outline-blue-300 disabled:bg-gray-500 disabled:hover:outline-none disabled:focus:outline-none disabled:cursor-not-allowed"
      >
        {isPending ? '가입 중...' : '회원가입'}
      </button>

      <p className="text-sm text-center">
        이미 계정이 있나요?{' '}
        <Link to="/login" className="text-blue-600">
          로그인
        </Link>
      </p>
    </form>
  );
}
