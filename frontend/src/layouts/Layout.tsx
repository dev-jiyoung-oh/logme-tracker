import { Outlet } from 'react-router-dom';
import Header from '@/layouts/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}