import { Route, Routes } from 'react-router-dom';

import VideoRoom from '@pages/common/chat/VideoRoom';

import Layout from './components/layout/Layout';
import NotFound from './pages/common/NotFound';
import ChatRoom from './pages/common/chat/ChatRoom';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';
import Schedule from './pages/user/Schedule';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="chatroom/:roomId" element={<ChatRoom />} />
        <Route path="videoroom" element={<VideoRoom />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
