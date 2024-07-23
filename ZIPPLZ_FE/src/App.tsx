import { Link, Outlet, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import CalendarTest from './components/schedule/CalendarTest';
import NotFound from './pages/common/NotFound';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="calendar" element={<CalendarTest />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
