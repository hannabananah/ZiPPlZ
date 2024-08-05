import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/Layout';
// 공통 컴포넌트
// 구인 게시물 컴포넌트, 시공자 컴포넌트
import Custom404 from '@pages/common/404';
import ChatRoom from '@pages/common/chat/ChatRoom';
import VideoRoom from '@pages/common/chat/VideoRoom';
import Community from '@pages/common/community/HousePostList';
import Home from '@pages/common/home/Home';
import MyBoardAndScrapList from '@pages/common/mypage/MyBoardAndScrapList';
import MyInformationModify from '@pages/common/mypage/MyInformationModify';
import MyPage from '@pages/common/mypage/MyPage';
import MyPasswordModify from '@pages/common/mypage/MyPasswordModify';
import Policy from '@pages/common/mypage/Policy';
import Resign from '@pages/common/mypage/Resign';
import Version from '@pages/common/mypage/Version';
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

// 포트폴리오+시공자 상세보기
// import OverView from '@pages/worker/tabs/OverView';
// import Review from '@pages/worker/tabs/Review';
// import WorkerSchedule from '@pages/worker/tabs/WorkerSchedule';
import Login from './pages/common/login/LogIn';
import FindIdPw from './pages/common/login/find/FindIdPw';
import SignUp from './pages/common/signup/SignUp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule/:id" element={<Schedule />} />
        <Route path="community" element={<Community />} />
        {/* <Route path="workers" element={<Workers />} /> */}

        <Route path="mypage" element={<MyPage />} />
        <Route path="chatrooms/:roomId/videoroom" element={<VideoRoom />} />
        <Route path="chatrooms/:roomId" element={<ChatRoom />} />
        <Route path="404" element={<Custom404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route
          path="findworkerdetailcreate"
          element={<FindWorkerDetailCreate />}
        />
        <Route path="workerinfodatedetail" element={<WorkerInfoDateDetail />} />
        <Route
          path="workerinfolocationdetail"
          element={<WorkerInfoLocationDetail />}
        />
        <Route path="findworkers" element={<FindWorkerList />} />
        <Route path="findworkers/:id" element={<FindWorkerDetail />} />
        <Route path="workers" element={<WorkerInfoList />} />
        <Route path="workers/:id/portfolio" element={<Portfolio />} />

        {/* 마이페이지 */}
        <Route path="myboardandscraplist" element={<MyBoardAndScrapList />} />
        <Route path="myinformationmodify" element={<MyInformationModify />} />
        <Route path="mypasswordModify" element={<MyPasswordModify />} />
        <Route path="policy" element={<Policy />} />
        <Route path="resign" element={<Resign />} />
        <Route path="version" element={<Version />} />
        <Route path="resigncomplete" element={<ResignComplete />} />
        <Route path="beforeresign" element={<BeforeResign />} />
        <Route path="dontusezipplz" element={<DontUseZIPPLZ />} />
      </Route>
      <Route path="/member/join/:type/:order/:phrase" element={<SignUp />} />
      <Route path="/member/login" element={<Login />} />
      <Route path="/member/find" element={<FindIdPw />} />

      <Route path="404" element={<Custom404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
