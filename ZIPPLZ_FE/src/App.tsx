import { Link, Outlet, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import NotFound from './pages/common/NotFound';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';
import Schedule from './pages/user/Schedule';

export default function App() {
  return (
    <div>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}
