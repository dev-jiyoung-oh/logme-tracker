import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProtectedRoute() {
  const isLoggedIn = useAuthStore((s) => !!s.token);
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인 안 된 상태면 /login 으로 리다이렉트
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
