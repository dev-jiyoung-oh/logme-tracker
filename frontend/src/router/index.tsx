import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Log from '../pages/Log'
import History from '../pages/History'
import Detail from '../pages/Detail'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/log" element={<Log />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter