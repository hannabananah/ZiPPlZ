<<<<<<< HEAD
import { IoIosClose } from 'react-icons/io';
import { PiChatsCircleFill } from 'react-icons/pi';

import Circle from '@assets/gradient-circle.svg?react';
import FullModal from '@components/common/FullModal';
import { useChatRoomsModalState, useModalActions } from '@store/modalStore';

export default function FloatingChatButton() {
  const { changeModalState } = useModalActions();
  const chatRoomsModal = useChatRoomsModalState();

  const handleToggleModal = () => {
    changeModalState('chatRooms');
  };
=======
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
>>>>>>> 8515700 (ADD: 중간 커밋)

  return (
    <>
      <button
<<<<<<< HEAD
        onClick={handleToggleModal}
=======
        onClick={() => {
          navigate('/chatlist');
        }}
>>>>>>> 8515700 (ADD: 중간 커밋)
        className="absolute right-4 drop-shadow-zp-deep bottom-24"
      >
        <Circle />
        <div className="absolute transform -translate-x-1/2 -translate-y-[14px] top-1/2 left-1/2">
<<<<<<< HEAD
          {chatRoomsModal ? (
            <IoIosClose size={24} />
          ) : (
            <PiChatsCircleFill size={24} />
          )}
        </div>
      </button>
      <FullModal isOpen={chatRoomsModal} onRequestClose={handleToggleModal} />
=======
          <PiChatsCircleFill size={24} />
        </div>
      </button>
>>>>>>> 8515700 (ADD: 중간 커밋)
    </>
  );
}
