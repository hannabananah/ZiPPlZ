import { PiChatsCircleFill } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';

import Circle from '@assets/gradient-circle.svg?react';

export default function FloatingChatButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // 로그인, 회원가입, 채팅룸에서는 안보이도록
  if (
    path === '/login' ||
    path === '/signup' ||
    path === '/chatroom' ||
    path === '/chatlist'
  )
    return null;

  return (
    <>
      <button
        onClick={() => {
          navigate('/chatlist');
        }}
        className="absolute right-4 drop-shadow-zp-deep bottom-24"
      >
        <Circle />
        <div className="absolute transform -translate-x-1/2 -translate-y-[14px] top-1/2 left-1/2">
          <PiChatsCircleFill size={24} />
        </div>
      </button>
    </>
  );
}
