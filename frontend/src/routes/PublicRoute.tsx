import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

export default function PublicRoute() {
  const isLoggedIn = useAuthStore((s) => !!s.token);

  if (isLoggedIn) {
    // 이미 로그인 상태면 홈으로 리다이렉트
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
