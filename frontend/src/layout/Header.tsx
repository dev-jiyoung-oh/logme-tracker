import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/Button";

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="w-full px-4 py-2 bg-white border-b flex justify-between items-center">
      <Button as="a" href="/" variant="none" className="font-bold text-xl">로그미</Button>

      <nav className="space-x-4">
        {user ? (
          <>
            <Button as="a" href="/mypage" variant="h-underline">마이페이지</Button>
            <Button as="button" variant="h-underline" onClick={logout}>로그아웃</Button>
          </>
        ) : (
          <>
            <Button as="a" href="/login" variant="h-underline">로그인</Button>
            <Button as="a" href="/signup" variant="h-underline">회원가입</Button>
          </>
        )}
      </nav>
    </header>
  );
}
