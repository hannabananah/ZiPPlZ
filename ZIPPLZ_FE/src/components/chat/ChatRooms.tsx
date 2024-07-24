import { useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Badge from '@assets/certified-icon.svg?react';
import Input from '@components/common/Input';
import ModalComponent from '@components/common/Modal';
import { useChatStore } from '@stores/chatStore';
import { useModalActions } from '@stores/modalStore';

const chatRooms = [
  {
    id: 1,
    name: '강신구',
    message:
      '안녕하세요 새로 30평 아파트에 거주하고 있는데요. 총 챗젼이 으갸갸갸으갸갸으악',
    temp: '36.5℃',
    unread: 5,
    imageUrl: 'https://i.pravatar.cc/50?img=1',
  },
  {
    id: 2,
    name: '강신구',
    message:
      '안녕하세요 새로 30평 아파트에 거주하고 있는데요. 총 챗젼이 으갸갸갸으갸갸으악',
    temp: '36.5℃',
    unread: 5,
    imageUrl: 'https://i.pravatar.cc/50?img=2',
  },
  {
    id: 3,
    name: '강신구',
    message:
      '안녕하세요 새로 30평 아파트에 거주하고 있는데요. 총 챗젼이 으갸갸갸으갸갸으악',
    temp: '36.5℃',
    unread: 5,
    imageUrl: 'https://i.pravatar.cc/50?img=3',
  },
  {
    id: 4,
    name: '강신구',
    message:
      '안녕하세요 새로 30평 아파트에 거주하고 있는데요. 총 챗젼이 으갸갸갸으갸갸으악',
    temp: '36.5℃',
    unread: 5,
    imageUrl: 'https://i.pravatar.cc/50?img=4',
  },
  {
    id: 5,
    name: '강신구',
    message: '안녕하세요 새로 30평 아파트에 거주하고 있는데요. 총 챗젼이 ...',
    temp: '36.5℃',
    unread: 5,
    imageUrl: 'https://i.pravatar.cc/50?img=5',
  },
  {
    id: 6,
    name: '강신구',
    message: '안녕하세요 새로 30평 아파트에 거주하고 있는데요. 총 챗젼이 ...',
    temp: '36.5℃',
    unread: 5,
    imageUrl: 'https://i.pravatar.cc/50?img=6',
  },
];

export default function ChatRooms() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const { openModal, closeModal } = useModalActions();
  const setSelectedChatRoom = useChatStore(
    (state) => state.setSelectedChatRoom
  );

  const handleRoomClick = (room: (typeof chatRooms)[number]) => {
    setSelectedChatRoom(room);
    closeModal('chatRooms');
    navigate(`/chatrooms/${room.id}`);
  };

  const handleClearInput = () => {
    setSearchText('');
  };

  const handleDeleteChatroom = (roomId: number) => {
    setSelectedRoomId(roomId);
    openModal('select');
  };

  const handleConfirmDelete = () => {
    if (selectedRoomId !== null) {
      console.log('selected');
      setSelectedRoomId(null);
      //
    }
    closeModal('select');
  };

  return (
    <div className="relative flex flex-col w-full pb-8 overflow-y-auto">
      <div className="sticky top-0 z-30 w-full px-8 pt-6 bg-zp-white">
        <div className="relative w-full mb-8">
          <span className="absolute transform -translate-y-1/2 left-4 top-1/2">
            <IoIosSearch />
          </span>
          <Input
            type="text"
            placeholder="이름을 입력해주세요."
            inputType="search"
            width="full"
            height={2}
            className="pl-8"
            fontSize="sm"
            radius="big"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') alert('keydown');
            }}
          />
          <button
            className="absolute transform -translate-y-1/2 right-4 top-1/2"
            onClick={handleClearInput}
          >
            <IoIosClose size={24} />
          </button>
        </div>
      </div>
      <ul className="grid w-full px-8 gap-x-5 gap-y-4 md:grid-cols-2 sm:grid-cols-1">
        {chatRooms.map((room) => (
          <li
            key={room.id}
            className="flex flex-col items-center p-2.5 bg-zp-light-orange rounded-zp-radius-big drop-shadow-zp-normal cursor-pointer"
            onClick={() => handleRoomClick(room)}
          >
            <button
              className="self-end rounded-zp-radius-full"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteChatroom(room.id);
              }}
            >
              <IoIosClose size={20} />
            </button>
            <div className="flex items-center justify-center w-full">
              <div className="relative flex justify-center basis-2/5">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="profile-img"
                />
                {room.unread > 0 && (
                  <span className="absolute -translate-x-1/2 right-0 top-0 flex items-center justify-center w-3.5 h-3.5 rounded-zp-radius-full bg-zp-red text-zp-white text-zp-2xs">
                    {room.unread}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center justify-center flex-grow gap-1 basis-3/5">
                <div className="flex items-center gap-1">
                  <span className="font-semibold break-keep text-zp-sm">
                    {room.name}
                  </span>
                  <Badge />
                </div>
                <div className="flex gap-2 text-sm text-zp-light-gray text-zp-3xs">
                  <span className="text-zp-gray break-keep">분야</span> |
                  <span className="text-zp-gray break-keep">{room.temp}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex w-full max-w-48 leading-1.5 py-2.5 px-2 border-zp-main-color border bg-zp-white rounded-e-zp-radius-bubble rounded-es-zp-radius-bubble items-center space-x-2 rtl:space-x-reverse">
              <p className="text-zp-2xs line-clamp-2">{room.message}</p>
              <span className="self-end break-keep text-zp-2xs text-zp-light-gray">
                시간
              </span>
            </div>
          </li>
        ))}
      </ul>
      <ModalComponent
        type="select"
        title="채팅방 삭제"
        message="해당 채팅방을 정말 삭제하시겠습니까?"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
