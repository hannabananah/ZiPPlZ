import { Route, Routes } from 'react-router-dom';

import VideoRoom from '@pages/common/chat/VideoRoom';

import Layout from './components/layout/Layout';
import NotFound from './pages/common/NotFound';
<<<<<<< HEAD
=======
import ChatList from './pages/common/chat/ChatList';
>>>>>>> 8515700 (ADD: 중간 커밋)
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
<<<<<<< HEAD
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
=======
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="chatlist" element={<ChatList />} />
          <Route path="chatroom/:roomId" element={<ChatRoom />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
>>>>>>> 5e99630 (ADD: 중간 커밋)
>>>>>>> 8515700 (ADD: 중간 커밋)
  );
}
