import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeRoute from '@/routes/HomeRoute';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Log from '@/pages/Log';
import History from '@/pages/History';
import Detail from '@/pages/Detail';
import NotFound from '@/pages/NotFound';
import Layout from '@/layouts/Layout';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomeRoute />} />
          
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/log" element={<Log />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:id" element={<Detail />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
