import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import ChatRooms from '@components/chat/ChatRooms';
import FullModal from '@components/common/FullModal';
import BottomTab from '@components/layout/BottomTab';
import FloatingChatButton from '@components/layout/FloatingChatButton';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { useCurrentModals, useModalActions } from '@stores/modalStore';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const notShowHeader = path.startsWith('/chatrooms');
  const is404Page = path === '/404';
  const currentModals = useCurrentModals();
  const { closeModal } = useModalActions();

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center w-full max-w-[600px] mx-auto">
        <div className="px-6 relative flex flex-col w-full min-h-screen bg-zp-light-beige">
          {!notShowHeader && !is404Page && <Header />}
          <div className="flex-1 w-full h-full justify-self-center">
            <Outlet />
          </div>
          {!notShowHeader && !is404Page && <FloatingChatButton />}
          {!notShowHeader && !is404Page && <BottomTab />}
          {(path === '/' || path === '/mypage') && <Footer />}
        </div>
      </div>
      {currentModals.includes('chatRooms') && (
        <FullModal
          isOpen={currentModals.includes('chatRooms')}
          onRequestClose={() => closeModal('chatRooms')}
        >
          <ChatRooms />
        </FullModal>
      )}
    </Suspense>
  );
}
