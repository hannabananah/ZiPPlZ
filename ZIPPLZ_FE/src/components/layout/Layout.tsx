import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import BottomTab from '@components/layout/BottomTab';
import FloatingChatButton from '@components/layout/FloatingChatButton';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Suspense>
      {
        <div className="flex flex-col items-center min-h-screen">
          <div className="flex flex-col relative w-[600px] min-h-screen">
            {path !== '/chatlist' && path !== '/chatroom' && <Header />}
            <div className="flex-1 h-full justify-self-center bg-zp-light-yellow">
              <Outlet />
            </div>
            <FloatingChatButton />
            <BottomTab />
            {(path === '/' || path === '/mypage') && <Footer />}
          </div>
        </div>
      }
    </Suspense>
  );
}
