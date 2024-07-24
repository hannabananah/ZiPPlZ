import { Route, Routes } from 'react-router-dom';

<<<<<<< HEAD
<<<<<<< HEAD
import VideoRoom from '@pages/common/chat/VideoRoom';
=======
import Button from '@components/common/Button';
>>>>>>> c770e44 (FEAT: create Button Component)

=======
>>>>>>> 7e3dddf (FEAT: create Input Component)
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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
>>>>>>> c770e44 (FEAT: create Button Component)
  );
}
