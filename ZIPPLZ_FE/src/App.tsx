import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
// 공통 컴포넌트
// 구인 게시물 컴포넌트, 시공자 컴포넌트
import FindWorkerListItem from './components/worker/FindWorkerListItem';
import WorkerInfoListItem from './components/worker/WorkerInfoListItem';
//
import NotFound from './pages/common/NotFound';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';
// 워커 찾기
import FindWorkerDetail from './pages/common/workerinfo/FindWorkerDetail';
import FindWorkerDetailCreate from './pages/common/workerinfo/FindWorkerDetailCreate';
import FindWorkerList from './pages/common/workerinfo/FindWorkerList';
import WorkerInfoDateDetail from './pages/common/workerinfo/WorkerInfoDateDetail';
import WorkerInfoList from './pages/common/workerinfo/WorkerInfoList';
import WorkerInfoLocationDetail from './pages/common/workerinfo/WorkerInfoLocationDetail';
// 포트폴리오+시공자 상세보기
import Portfolio from './pages/worker/Portfolio';
import OverView from './pages/worker/tabs/OverView';
import Review from './pages/worker/tabs/Review';
import WorkerSchedule from './pages/worker/tabs/WorkerSchedule';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mypage" element={<MyPage />} />

          {/* 구인 게시물 컴포넌트, 시공자 컴포넌트 */}
          <Route path="findWorkerListItem" element={<FindWorkerListItem />} />
          <Route path="workerInfoListItem" element={<WorkerInfoListItem />} />
          {/* 워커 찾기 */}
          <Route path="findWorkerDetail" element={<FindWorkerDetail />} />
          <Route
            path="FindWorkerDetailCreate"
            element={<FindWorkerDetailCreate />}
          />
          <Route path="findWorkerList" element={<FindWorkerList />} />
          <Route
            path="workerInfoDateDetail"
            element={<WorkerInfoDateDetail />}
          />
          <Route
            path="workerInfoLocationDetail"
            element={<WorkerInfoLocationDetail />}
          />
          <Route path="workerInfoList" element={<WorkerInfoList />} />

          {/* 포트폴리오+시공자 상세보기 */}
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="overView" element={<OverView />} />
          <Route path="workerSchedule" element={<WorkerSchedule />} />
          <Route path="review" element={<Review />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
