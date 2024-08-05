import { useEffect, useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Badge from '@assets/certified-icon.svg?react';
import Input from '@components/common/Input';
import ModalComponent from '@components/common/Modal';
import { useChatStore } from '@stores/chatStore';
import { useModalActions } from '@stores/modalStore';
import { formatTime } from '@utils/formatDateWithTime';
import axios from 'axios';

const mockChatRooms = [
  {
    chatroom_serial: 1,
    name: 'hansssssssssnah',
    chatroom_name: 'John DoeDoeDoeDoeDoDoeDoee',
    lastMessage: 'Hello! How are you?',
    createdAt: '2024-08-05 22:00:39',
    unreadCount: 3,
    imageUrl: 'https://i.pravatar.cc/50?img=1',
    temp: '36.5℃',
  },
  {
    chatroom_serial: 2,
    name: 'hannah2',
    chatroom_name: 'Jane Smith',
    lastMessage: 'Are we still on for tomorrow?',
    createdAt: '2024-08-05 23:00:39',
    unreadCount: 0,
    imageUrl: 'https://i.pravatar.cc/50?img=2',
    temp: '80℃',
  },
  {
    chatroom_serial: 3,
    name: 'hannah3',
    chatroom_name: 'Alice Johnson',
    lastMessage: 'Great job on the project!',
    createdAt: '2024-08-05 11:00:39',
    unreadCount: 1,
    imageUrl: 'https://i.pravatar.cc/50?img=3',
    temp: '165℃',
  },
  {
    chatroom_serial: 4,
    name: 'hannah4',
    chatroom_name: 'Bob Brown',
    lastMessage: 'Can we reschssssssssssedule our meeting?',
    createdAt: '2024-08-05 11:00:39',
    unreadCount: 5,
    imageUrl: 'https://i.pravatar.cc/50?img=4',
    temp: '6.5℃',
  },
  {
    chatroom_serial: 5,
    name: 'hannah5',
    chatroom_name: 'Charlie Green',
    lastMessage: 'See you soon!',
    createdAt: '2024-08-05 11:00:39',
    unreadCount: 2,
    imageUrl: 'https://i.pravatar.cc/50?img=5',
    temp: '15℃',
  },
];

interface ChatRoom {
  chatroom_serial: number;
  name: string;
  chatroom_name: string;
  message: string;
  time: string;
  unread: number;
  imageUrl: string;
  temp: string;
  user_serial: number;
  session_id: string;
}

const base_url = import.meta.env.VITE_APP_BASE_URL;
const token = import.meta.env.VITE_APP_AUTH_TOKEN;

export default function ChatRooms() {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const { openModal, closeModal } = useModalActions();
  const setSelectedChatRoom = useChatStore(
    (state) => state.setSelectedChatRoom
  );

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        // const response = await axios.get(`${base_url}/chatroom`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const fetchedChatRooms: ChatRoom[] = mockChatRooms.map((room: any) => ({
          name: room.name,
          message: room.lastMessage,
          temp: room.temp,
          unread: room.unreadCount,
          imageUrl: 'https://i.pravatar.cc/50?img=1',
          chatroom_serial: parseInt(room.chatroom_serial),
          chatroom_name: room.chatroom_name,
          time: room.createdAt,
          user_serial: 1,
          session_id: 'monkey',
        }));

        setChatRooms(fetchedChatRooms);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  const handleRoomClick = (room: ChatRoom) => {
    setSelectedChatRoom(room);
    closeModal('chatRooms');
    navigate(`/chatrooms/${room.chatroom_serial}`);
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
      <ul className="grid w-full grid-cols-2 px-8 gap-x-5 gap-y-4 max-[460px]:grid-cols-1">
        {chatRooms.map((room) => (
          <li
            key={room.chatroom_serial}
            className="flex flex-col items-center p-2.5 bg-zp-light-orange rounded-zp-radius-big drop-shadow-zp-normal cursor-pointer"
            onClick={() => handleRoomClick(room)}
          >
            <button
              className="self-end rounded-zp-radius-full"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteChatroom(room.chatroom_serial);
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
              <div className="flex flex-col items-center justify-between flex-grow gap-1 basis-3/5 max-w-36">
                <div className="flex items-center justify-start w-11/12 gap-1">
                  <span className="font-semibold truncate max-w-24 break-keep text-zp-sm">
                    {room.name}
                  </span>
                  <Badge />
                </div>
                <div className="flex w-full gap-2 text-zp-light-gray text-zp-3xs">
                  <span className="truncate text-zp-gray break-keep">
                    {room.chatroom_name}
                  </span>{' '}
                  |<span className="text-zp-gray break-keep">{room.temp}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex w-full  leading-1.5 py-2.5 px-3 border-zp-main-color border bg-zp-white rounded-e-zp-radius-bubble rounded-es-zp-radius-bubble items-center space-x-2 rtl:space-x-reverse justify-between">
              <p className="truncate text-zp-2xs basis-9.5">{room.message}</p>
              <span className="self-end break-keep text-zp-3xs text-zp-light-gray">
                {formatTime(room.time)}
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
