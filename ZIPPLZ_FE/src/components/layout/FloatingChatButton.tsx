import { IoIosClose } from 'react-icons/io';
import { PiChatsCircleFill } from 'react-icons/pi';

import Circle from '@assets/gradient-circle.svg?react';
import { useCurrentModals, useModalActions } from '@store/modalStore';

export default function FloatingChatButton() {
  const { openModal, closeModal } = useModalActions();
  const currentModals = useCurrentModals();

  const handleToggleModal = () => {
    if (currentModals.includes('chatRooms')) {
      closeModal('chatRooms');
    } else {
      openModal('chatRooms');
    }
  };

  return (
    <>
      <button
        onClick={handleToggleModal}
        className="absolute right-4 drop-shadow-zp-deep bottom-24"
      >
        <Circle />
        <div className="absolute transform -translate-x-1/2 -translate-y-[14px] top-1/2 left-1/2">
          {currentModals.includes('chatRooms') ? (
            <IoIosClose size={24} />
          ) : (
            <PiChatsCircleFill size={24} />
          )}
        </div>
      </button>
    </>
  );
}
