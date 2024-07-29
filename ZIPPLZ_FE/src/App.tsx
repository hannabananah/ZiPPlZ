import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/Layout';
import Custom404 from '@pages/common/404';
import ChatRoom from '@pages/common/chat/ChatRoom';
import VideoRoom from '@pages/common/chat/VideoRoom';
import Community from '@pages/common/community/HousePostList';
import Home from '@pages/common/home/Home';
import MyPage from '@pages/common/mypage/MyPage';
import Workers from '@pages/common/workerinfo/WorkerInfoList';
import Schedule from '@pages/user/Schedule';
import Portfolio from '@pages/worker/Portfolio';

import Login from './pages/common/login/LogIn';
import SignUp from './pages/common/signup/SignUp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="member/join/:type/:order/:phrase" element={<SignUp />} />
        <Route path="member/login" element={<Login />} />
        <Route path="community" element={<Community />} />
        <Route path="workers" element={<Workers />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="chatrooms/:roomId/videoroom" element={<VideoRoom />} />
        <Route path="chatrooms/:roomId" element={<ChatRoom />} />
        <Route path="404" element={<Custom404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
