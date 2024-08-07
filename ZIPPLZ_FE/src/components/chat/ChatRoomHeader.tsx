import { CiMenuKebab } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { IoExitOutline, IoVideocamOutline } from 'react-icons/io5';
import { TiBusinessCard } from 'react-icons/ti';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import Badge from '@assets/certified-icon.svg?react';
import { useChatStore } from '@stores/chatStore';
import { useCurrentModals, useModalActions } from '@stores/modalStore';

Modal.setAppElement('#root');

interface ChatRoomHeaderProps {
  userName: string;
  certificated: boolean;
  area: string;
  fieldName: string;
  imageUrl?: string;
}

export default function ChatRoomHeader({
  userName,
  certificated,
  area,
  fieldName,
  imageUrl,
}: ChatRoomHeaderProps) {
  const navigate = useNavigate();
  const selectedChatRoom = useChatStore((state) => state.selectedChatRoom);
  const currentModals = useCurrentModals();
  const { closeModal, openModal } = useModalActions();

  const handleClickVideo = () => {
    if (selectedChatRoom) {
      navigate(`/chatrooms/${selectedChatRoom.chatroom_serial}/videoroom`);
    }
  };

  const handleClickOpenMenu = () => {
    openModal('mini');
  };

  const handleCloseModal = () => {
    closeModal('mini');
  };

  if (
    !selectedChatRoom ||
    !selectedChatRoom.otherUser ||
    !selectedChatRoom.otherUser.image
  ) {
    return null;
  }

  return (
    <div className="sticky top-0 flex items-center justify-between h-20 px-4 align-middle bg-zp-transparent gap-x-6">
      <button onClick={() => navigate('/')}>
        <IoIosArrowBack size={16} fill="#111" />
      </button>
      <img
        src={imageUrl || 'path/to/placeholder-image.png'}
        alt="profile image"
        className="w-12 h-12 rounded-zp-radius-full"
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-1">
          <span className="font-semibold truncate text-zp-md max-w-28">
            {userName}
          </span>
          {certificated && <Badge />}
        </div>
        <div className="flex gap-2 text-sm text-zp-gray">
          <span className="truncate max-w-20">{area}</span> |
          <span>{fieldName}</span>
        </div>
      </div>
      <div className="relative flex gap-3">
        <button onClick={handleClickVideo}>
          <IoVideocamOutline size={20} />
        </button>
        <button onClick={handleClickOpenMenu}>
          <CiMenuKebab size={20} />
        </button>
        <Modal
          isOpen={currentModals.includes('mini')}
          onRequestClose={handleCloseModal}
          className="absolute right-0 overflow-hidden top-10 max-w-40 shadow-zp-deep rounded-zp-radius-big"
          overlayClassName="bg-transparent bg-opacity-none fixed inset-0"
        >
          <div className="w-full p-3 text-zp-2xs">
            <button
              onClick={() => {
                handleCloseModal();
                navigate('/');
              }}
              className="flex items-center w-full p-2 border rounded-zp-radius-btn text-zp-gray hover:bg-zp-light-yellow bg-zp-white border-zp-sub-color"
            >
              <IoExitOutline size={20} className="mr-2" />
              <span>채팅방 떠나기</span>
            </button>
            <button
              onClick={() => {
                handleCloseModal();
                navigate('/portfolio');
              }}
              className="flex items-center w-full p-2 border rounded-zp-radius-btn text-zp-gray hover:bg-zp-light-yellow bg-zp-white border-zp-sub-color"
            >
              <TiBusinessCard size={20} className="mr-2" />
              <span>포트폴리오 보기</span>
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
