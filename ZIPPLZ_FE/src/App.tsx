import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

import Layout from './components/layout/Layout';
import SchedulerCard from './components/scheduler/SchedulerCard';
import NotFound from './pages/common/NotFound';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';

export default function App() {
  return (
    <div>
      <SchedulerCard />
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}
