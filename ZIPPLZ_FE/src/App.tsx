import { Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/Layout';
import NotFound from '@pages/common/NotFound';
import ChatRoom from '@pages/common/chat/ChatRoom';
import VideoRoom from '@pages/common/chat/VideoRoom';
import CommunityPage from '@pages/common/community/HousePostList';
import Home from '@pages/common/home/Home';
import MyPage from '@pages/common/mypage/MyPage';
import Calendar from '@pages/user/Schedule';
import WorkersPage from '@pages/worker/Portfolio';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="workers" element={<WorkersPage />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="videoroom" element={<VideoRoom />} />
        <Route path="chatrooms/:roomId" element={<ChatRoom />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
