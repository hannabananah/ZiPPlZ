import { Route, Routes } from 'react-router-dom';

import Button from '@components/common/Button';

import Layout from './components/layout/Layout';
import CalendarTest from './components/schedule/CalendarTest';
import NotFound from './pages/common/NotFound';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';

export default function App() {
  return (
    <>
      <p>hello</p>
      <Button
        children="primary"
        buttonType="primary"
        width={6}
        height={3}
        fontSize="lg"
        radius="btn"
        onClick={() => alert('clicked')}
      />
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
