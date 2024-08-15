import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@components/layout/Layout';
// 공통 컴포넌트
// 구인 게시물 컴포넌트, 시공자 컴포넌트
import Custom404 from '@pages/common/404';
import ChatRoom from '@pages/common/chat/ChatRoom';
import Community from '@pages/common/community/HousePost';
import Home from '@pages/common/home/Home';
import MyInformationModify from '@pages/common/mypage/MyInformationModify';
import MyPage from '@pages/common/mypage/MyPage';
import MyPasswordModify from '@pages/common/mypage/MyPasswordModify';
import MyScrapList from '@pages/common/mypage/MyScrapList';
import Policy from '@pages/common/mypage/Policy';
import Version from '@pages/common/mypage/Version';
import WishWorkerList from '@pages/common/mypage/WishWorkerList';
import MyFindWorkerList from '@pages/common/mypage/postpage/MyFindWorkerList';
import BeforeResign from '@pages/common/mypage/resignpage/BeforeResign';
import DontUseZIPPLZ from '@pages/common/mypage/resignpage/DontUseZIPPLZ';
import Resign from '@pages/common/mypage/resignpage/Resign';
import ResignComplete from '@pages/common/mypage/resignpage/ResignComplete';
import MyFindWorkerScrapList from '@pages/common/mypage/scrappage/MyFindWorkerScrapList';
// 워커 찾기
import FindWorkerDetail from '@pages/common/workerinfo/FindWorkerDetail';
import FindWorkerDetailCreate from '@pages/common/workerinfo/FindWorkerDetailCreate';
import Schedule from '@pages/user/Schedule';
import Portfolio from '@pages/worker/Portfolio';

import Contract from './pages/common/Contract';
import HousePost from './pages/common/community/HousePost';
import HousePostCreate from './pages/common/community/HousePostCreate';
import HousePostDetail from './pages/common/community/HousePostDetail';
import HousePostUpdate from './pages/common/community/HousePostUpdate';
import QuestionPost from './pages/common/community/QuestionPost';
import QuestionPostCreate from './pages/common/community/QuestionPostCreate';
import QuestionPostDetail from './pages/common/community/QuestionPostDetail';
import QuestionPostUpdate from './pages/common/community/QuestionPostUpdate';
import ImageChangePage from './pages/common/home/ImageChangePage';
import Login from './pages/common/login/LogIn';
import SocialLoginCheck from './pages/common/login/SocialLoginCheck';
import FindIdPw from './pages/common/login/find/FindIdPw';
import WorkerInfoLocationDetail from './pages/common/mypage/WorkerInfoLocationDetail';
import MyHousePostList from './pages/common/mypage/postpage/MyHousePostList';
import MyQuestionPostList from './pages/common/mypage/postpage/MyQuestionPostList';
import RoughWorker from './pages/common/mypage/resignpage/RoughWorker';
import MyHousePostScrapList from './pages/common/mypage/scrappage/MyHousePostScrapList';
import MyQuestionPostScrapList from './pages/common/mypage/scrappage/MyQuestionPostScrapList';
import SignUp from './pages/common/signup/SignUp';
import UpdateFindWorker from './pages/common/workerinfo/UpdateFindWorker';
import Workers from './pages/common/workerinfo/Workers';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* 스케줄 & 계약서 */}
        <Route path="schedule" element={<Schedule />} />
        <Route path="contract/:workserial" element={<Contract />} />
        <Route path="community" element={<Community />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="chatrooms/:chatroomSerial" element={<ChatRoom />} />
        <Route path="image-change/:userSerial" element={<ImageChangePage />} />
        <Route path="findworker/write" element={<FindWorkerDetailCreate />} />
        <Route path="workers/:category" element={<Workers />} />
        <Route
          path="workers/findworker/write"
          element={<FindWorkerDetailCreate />}
        />
        <Route
          path="workers/findworker/update/:boardSerial"
          element={<UpdateFindWorker />}
        />
        <Route path="workers/findworker/:id" element={<FindWorkerDetail />} />
        <Route path="workers/:id/portfolio" element={<Portfolio />} />
        <Route path="housepost" element={<HousePost />} />
        <Route path="housepost/:id" element={<HousePostDetail />} />
        <Route path="questionpost" element={<QuestionPost />} />
        <Route path="questionpost/:id" element={<QuestionPostDetail />} />
        <Route path="housepostcreate" element={<HousePostCreate />} />
        <Route path="housepostupdate" element={<HousePostUpdate />} />

        <Route path="questionpostupdate" element={<QuestionPostUpdate />} />
        <Route path="questionpostcreate" element={<QuestionPostCreate />} />
        {/* 마이페이지 */}
        <Route path="mypage/MyFindWorkerList" element={<MyFindWorkerList />} />
        <Route path="mypage/myhousepostlist" element={<MyHousePostList />} />
        <Route
          path="mypage/Myquestionpostlist"
          element={<MyQuestionPostList />}
        />
        <Route
          path="mypage/myfindworkerscraplist"
          element={<MyFindWorkerScrapList />}
        />
        <Route
          path="mypage/Myhousepostscraplist"
          element={<MyHousePostScrapList />}
        />
        <Route
          path="mypage/Myquestionpostscraplist"
          element={<MyQuestionPostScrapList />}
        />
        <Route path="mypage/myscraplist" element={<MyScrapList />} />
        <Route
          path="mypage/myinformationmodify"
          element={<MyInformationModify />}
        />
        <Route
          path="mypage/workerinfolocationdetail"
          element={<WorkerInfoLocationDetail />}
        />
        <Route path="mypage/mypasswordmodify" element={<MyPasswordModify />} />
        <Route path="mypage/policy" element={<Policy />} />
        <Route path="mypage/resign" element={<Resign />} />
        <Route path="mypage/version" element={<Version />} />
        <Route path="mypage/resigncomplete" element={<ResignComplete />} />
        <Route path="mypage/beforeresign" element={<BeforeResign />} />
        <Route path="mypage/dontusezipplz" element={<DontUseZIPPLZ />} />
        <Route path="mypage/wishworkerlist" element={<WishWorkerList />} />
        <Route path="mypage/roughworker" element={<RoughWorker />} />
      </Route>
      {/* 로그인 회원가입 */}
      <Route path="/member/join/:type/:order/:phrase" element={<SignUp />} />
      <Route path="/member/login" element={<Login />} />
      <Route path="/member/find" element={<FindIdPw />} />
      <Route path="404" element={<Custom404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="success" element={<SocialLoginCheck />} />
    </Routes>
  );
}
