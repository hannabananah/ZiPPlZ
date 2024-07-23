import { Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/Layout';
import NotFound from '@pages/common/NotFound';
import ChatRoom from '@pages/common/chat/ChatRoom';
import VideoRoom from '@pages/common/chat/VideoRoom';
import Community from '@pages/common/community/HousePostList';
import Home from '@pages/common/home/Home';
import MyPage from '@pages/common/mypage/MyPage';
import Workers from '@pages/common/workerinfo/WorkerInfoList';
import Schedule from '@pages/user/Schedule';
import Portfolio from '@pages/worker/Portfolio';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="community" element={<Community />} />
        <Route path="workers" element={<Workers />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="videoroom" element={<VideoRoom />} />
        <Route path="chatrooms/:roomId" element={<ChatRoom />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
