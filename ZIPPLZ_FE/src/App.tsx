import { Route, Routes } from 'react-router-dom';

<<<<<<< HEAD
import VideoRoom from '@pages/common/chat/VideoRoom';
=======
import Button from '@components/common/Button';
>>>>>>> c770e44 (FEAT: create Button Component)

import Layout from './components/layout/Layout';
import NotFound from './pages/common/NotFound';
import ChatRoom from './pages/common/chat/ChatRoom';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';
import Schedule from './pages/user/Schedule';

export default function App() {
  return (
<<<<<<< HEAD
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="chatroom/:roomId" element={<ChatRoom />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="videoroom" element={<VideoRoom />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
=======
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
>>>>>>> c770e44 (FEAT: create Button Component)
  );
}
