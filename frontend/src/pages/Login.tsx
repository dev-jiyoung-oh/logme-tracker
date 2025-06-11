import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';
import { isEmailValid } from '@/utils/validate';
import { Button } from '@/components/Button';

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-4 text-center">

      <h1 className="text-2xl font-bold">로그인</h1>

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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <Button
        as='button'
        type='submit'
        fullWidth={true}
        isDisabled={!isFormValid}
        loading={isPending}
        loadingText='로딩중...'>
          로그인
      </Button>

      <p className="text-sm">
        회원이 아니신가요?
        <Button as='a' href="/signup" variant='h-underline' size="sm">회원가입</Button>
      </p>
    </form>
  );
}
