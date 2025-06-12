import { useAuthStore } from '@/stores/useAuthStore';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';

function HomeRoute() {
  const isLoggedIn = useAuthStore((s) => !!s.token);

  return isLoggedIn ? <Home /> : <Landing />;
}

export default HomeRoute;