import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/Layout';
// 공통 컴포넌트
// 구인 게시물 컴포넌트, 시공자 컴포넌트
import Custom404 from '@pages/common/404';
import ChatRoom from '@pages/common/chat/ChatRoom';
import VideoRoom from '@pages/common/chat/VideoRoom';
import Community from '@pages/common/community/HousePostList';
import Home from '@pages/common/home/Home';
import MyBoardList from '@pages/common/mypage/MyBoardList';
import MyInformationModify from '@pages/common/mypage/MyInformationModify';
import MyPage from '@pages/common/mypage/MyPage';
import MyPasswordModify from '@pages/common/mypage/MyPasswordModify';
import MyScrapList from '@pages/common/mypage/MyScrapList';
import Policy from '@pages/common/mypage/Policy';
import Resign from '@pages/common/mypage/Resign';
import Version from '@pages/common/mypage/Version';
import WishWorkerList from '@pages/common/mypage/WishWorkerList';
import BeforeResign from '@pages/common/mypage/resignpage/BeforeResign';
import DontUseZIPPLZ from '@pages/common/mypage/resignpage/DontUseZIPPLZ';
import ResignComplete from '@pages/common/mypage/resignpage/ResignComplete';
//
// 워커 찾기
import FindWorkerDetail from '@pages/common/workerinfo/FindWorkerDetail';
import FindWorkerDetailCreate from '@pages/common/workerinfo/FindWorkerDetailCreate';
import FindWorkerList from '@pages/common/workerinfo/FindWorkerList';
import WorkerInfoDateDetail from '@pages/common/workerinfo/WorkerInfoDateDetail';
import WorkerInfoList from '@pages/common/workerinfo/WorkerInfoList';
import WorkerInfoLocationDetail from '@pages/common/workerinfo/WorkerInfoLocationDetail';
import Schedule from '@pages/user/Schedule';
import Portfolio from '@pages/worker/Portfolio';

import HousePost from './pages/common/community/HousePost';
import HousePostDetail from './pages/common/community/HousePostDetail';
import HousePostDetailCreate from './pages/common/community/HousePostDetailCreate';
import QuestionPost from './pages/common/community/QuestionPost';
import QuestionPostDetail from './pages/common/community/QuestionPostDetail';
import QuestionPostDetailCreate from './pages/common/community/QuestionPostDetailCreate';
import Login from './pages/common/login/LogIn';
import FindIdPw from './pages/common/login/find/FindIdPw';
import SignUp from './pages/common/signup/SignUp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="community" element={<Community />} />
        {/* <Route path="workers" element={<Workers />} /> */}

        <Route path="mypage" element={<MyPage />} />
        <Route path="chatrooms/:roomId/videoroom" element={<VideoRoom />} />
        <Route path="chatrooms/:roomId" element={<ChatRoom />} />
        <Route path="404" element={<Custom404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="findworker/write" element={<FindWorkerDetailCreate />} />
        <Route path="workerinfodatedetail" element={<WorkerInfoDateDetail />} />
        <Route
          path="workerinfolocationdetail"
          element={<WorkerInfoLocationDetail />}
        />
        <Route path="findworkers" element={<FindWorkerList />} />
        <Route path="findworkers/:id" element={<FindWorkerDetail />} />
        <Route path="workers" element={<WorkerInfoList />} />
        <Route path="workers/:id/portfolio" element={<Portfolio />} />
        <Route path="housepost" element={<HousePost />} />
        <Route path="housepostdetail" element={<HousePostDetail />} />
        <Route path="questionpost" element={<QuestionPost />} />
        <Route path="questionpostdetail" element={<QuestionPostDetail />} />
        <Route
          path="housepostdetailcreate"
          element={<HousePostDetailCreate />}
        />
        <Route
          path="questionpostdetailcreate"
          element={<QuestionPostDetailCreate />}
        />

        {/* 마이페이지 */}
        <Route path="mypage/myboardlist" element={<MyBoardList />} />
        <Route path="mypage/myscraplist" element={<MyScrapList />} />
        <Route
          path="mypage/myinformationmodify"
          element={<MyInformationModify />}
        />
        <Route path="mypage/mypasswordmodify" element={<MyPasswordModify />} />
        <Route path="mypage/policy" element={<Policy />} />
        <Route path="mypage/resign" element={<Resign />} />
        <Route path="mypage/version" element={<Version />} />
        <Route path="mypage/resigncomplete" element={<ResignComplete />} />
        <Route path="mypage/beforeresign" element={<BeforeResign />} />
        <Route path="mypage/dontusezipplz" element={<DontUseZIPPLZ />} />
        <Route path="mypage/wishworkerlist" element={<WishWorkerList />} />
      </Route>
      <Route path="/member/join/:type/:order/:phrase" element={<SignUp />} />
      <Route path="/member/login" element={<Login />} />
      <Route path="/member/find" element={<FindIdPw />} />

      <Route path="404" element={<Custom404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
