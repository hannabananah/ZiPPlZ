import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import BottomTab from '@components/layout/BottomTab';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Suspense>
      <div className="w-full h-full min-h-screen">
        <Header />
        <Outlet />
        <BottomTab />
        {(path === '/' || path === '/mypage') && <Footer />}
      </div>
    </Suspense>
  );
}
