import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

import Layout from './components/layout/Layout';
import NotFound from './pages/common/NotFound';
import Home from './pages/common/home/Home';
import MyPage from './pages/common/mypage/MyPage';

export default function App() {
  return (
    <>
      <p>hello</p>
      <Button
        children="primary"
        buttonType="primary"
        width={6}
        height={2}
        fontSize="lg"
        radius="none"
        onClick={() => alert('clicked')}
      />
      <Input
        placeholder="이메일을 입력해주세요"
        inputType="signup"
        width={10}
        height={3}
        fontSize="xs"
        radius="none"
        onKeydown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') alert('keydown');
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
