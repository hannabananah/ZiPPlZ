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

  return (
    <>
      <button
        onClick={handleToggleModal}
        className="absolute right-4 drop-shadow-zp-deep bottom-24"
      >
        <Circle />
        <div className="absolute transform -translate-x-1/2 -translate-y-[14px] top-1/2 left-1/2">
          {chatRoomsModal ? (
            <IoIosClose size={24} />
          ) : (
            <PiChatsCircleFill size={24} />
          )}
        </div>
      </button>
      <FullModal isOpen={chatRoomsModal} onRequestClose={handleToggleModal} />
    </>
  );
}
