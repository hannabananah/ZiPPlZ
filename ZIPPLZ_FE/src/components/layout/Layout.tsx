import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import BottomTab from '@components/layout/BottomTab';
import FloatingChatButton from '@components/layout/FloatingChatButton';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const notShowHeader = path.startsWith('/chatrooms');

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center w-full max-w-[600px] mx-auto">
        <div className="relative flex flex-col w-full min-h-screen">
          {!notShowHeader && <Header />}
          <div className="flex-1 w-full h-full justify-self-center bg-zp-light-yellow">
            <Outlet />
          </div>
          {!notShowHeader && <FloatingChatButton />}
          {!notShowHeader && <BottomTab />}
          {(path === '/' || path === '/mypage') && <Footer />}
        </div>
      </div>
    </Suspense>
  );
}
