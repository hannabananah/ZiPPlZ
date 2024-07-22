import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import NotFound from './pages/common/NotFound';
import ChatList from './pages/common/chat/ChatList';
import ChatRoom from './pages/common/chat/ChatRoom';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';
import Schedule from './pages/user/Schedule';

export default function App() {
  return (
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
  );
}
