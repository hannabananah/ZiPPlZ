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
import FindId from './pages/common/login/find/FindId';
import FindIdPw from './pages/common/login/find/FindIdPw';
import FindPw from './pages/common/login/find/FindPw';
import SignUp from './pages/common/signup/SignUp';

// 공통 컴포넌트
// 구인 게시물 컴포넌트, 시공자 컴포넌트
import FindWorkerListItem from '@components/worker/FindWorkerListItem';
import WorkerInfoListItem from '@components/worker/WorkerInfoListItem';
import MyBoardAndScrapList from '@pages/common/mypage/MyBoardAndScrapList';
import MyInformationModify from '@pages/common/mypage/MyInformationModify';
import MyPasswordModify from '@pages/common/mypage/MyPasswordModify';
import Policy from '@pages/common/mypage/Policy';
import Resign from '@pages/common/mypage/Resign';
import Version from '@pages/common/mypage/Version';
import BeforeResign from '@pages/common/mypage/resignpage/BeforeResign';
import DontUseZIPPLZ from '@pages/common/mypage/resignpage/DontUseZIPPLZ';
import ResignComplete from '@pages/common/mypage/resignpage/ResignComplete';
// 워커 찾기
import FindWorkerDetail from '@pages/common/workerinfo/FindWorkerDetail';
import FindWorkerDetailCreate from '@pages/common/workerinfo/FindWorkerDetailCreate';
import FindWorkerList from '@pages/common/workerinfo/FindWorkerList';
import WorkerInfoDateDetail from '@pages/common/workerinfo/WorkerInfoDateDetail';
import WorkerInfoList from '@pages/common/workerinfo/WorkerInfoList';
import WorkerInfoLocationDetail from '@pages/common/workerinfo/WorkerInfoLocationDetail';
// 포트폴리오+시공자 상세보기
import OverView from '@pages/worker/tabs/OverView';
import Review from '@pages/worker/tabs/Review';
import WorkerSchedule from '@pages/worker/tabs/WorkerSchedule';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="community" element={<Community />} />
        <Route path="workers" element={<Workers />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="overView" element={<OverView />} />
        <Route path="workerSchedule" element={<WorkerSchedule />} />
        <Route path="review" element={<Review />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="chatrooms/:roomId/videoroom" element={<VideoRoom />} />
        <Route path="chatrooms/:roomId" element={<ChatRoom />} />
        <Route path="findWorkerDetail" element={<FindWorkerDetail />} />
        <Route
          path="FindWorkerDetailCreate"
          element={<FindWorkerDetailCreate />}
        />
        <Route path="findWorkerList" element={<FindWorkerList />} />
        <Route path="workerInfoDateDetail" element={<WorkerInfoDateDetail />} />
        <Route
          path="workerInfoLocationDetail"
          element={<WorkerInfoLocationDetail />}
        />
        <Route path="workerInfoList" element={<WorkerInfoList />} />
        <Route path="findWorkerListItem" element={<FindWorkerListItem />} />
        <Route path="workerInfoListItem" element={<WorkerInfoListItem />} />

        {/* 마이페이지 */}
        <Route path="myBoardAndScrapList" element={<MyBoardAndScrapList />} />
        <Route path="myInformationModify" element={<MyInformationModify />} />
        <Route path="myPasswordModify" element={<MyPasswordModify />} />
        <Route path="policy" element={<Policy />} />
        <Route path="resign" element={<Resign />} />
        <Route path="version" element={<Version />} />
        <Route path="resignComplete" element={<ResignComplete />} />
        <Route path="beforeResign" element={<BeforeResign />} />
        <Route path="dontUseZIPPLZ" element={<DontUseZIPPLZ />} />
        
      </Route>
      <Route path="/member/join/:type/:order/:phrase" element={<SignUp />} />
      <Route path="/member/login" element={<Login />} />
      <Route path="/member/find" element={<FindIdPw />} />
      
      <Route path="404" element={<Custom404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
