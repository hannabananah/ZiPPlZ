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

interface ChatRoom {
  chatroom_serial: number;
  message: string;
  field_name: string;
  worker_name: string;
  customer_name: string;
  temperature: number;
  time: string;
  unread: number;
  certificated: boolean;
  imageUrl: string;
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
        const response = await axios.get(`${base_url}/chatroom`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('response==========>', response);
        const fetchedChatRooms: ChatRoom[] = response.data.data.map(
          (room: any) => ({
            chatroom_serial: parseInt(room.chatroomSerial),
            message: room.lastMessage,
            field_name: room.fieldName,
            worker_name: room.workerName,
            customer_name: room.customerName,
            temperature: parseInt(room.temperature),
            time: room.createdAt,
            unread: parseInt(room.unreadCount),
            certificated: room.certificated,
            imageUrl: 'https://i.pravatar.cc/50?img=1',
            worker_location: room.workerLocation,
            customer_location: room.customerLocation,
            file: {
              file_serial: parseInt(room.fileSerial),
              save_folder: room.saveFolder,
              original_file: room.originalFile,
              save_file: room.saveFile,
              file_name: room.fileName,
            },
          })
        );

        setChatRooms(fetchedChatRooms);
      } catch (error) {
        console.error('---------Error fetching chat rooms:', error);
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
                  alt="프로필 이미지"
                  className="w-12 profile-img"
                />
                {room.unread > 0 && (
                  <span className="absolute -translate-x-1/2 right-3 top-0 flex items-center justify-center w-3.5 h-3.5 rounded-zp-radius-full bg-zp-red text-zp-white text-zp-2xs">
                    {room.unread}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center justify-between flex-grow gap-1 basis-3/5 max-w-36">
                <div className="flex items-center justify-start w-11/12 gap-1">
                  <span className="font-semibold truncate max-w-24 break-keep text-zp-sm">
                    {room.customer_name}
                  </span>
                  {room.certificated && <Badge />}
                </div>
                <div className="flex w-full gap-2 text-zp-light-gray text-zp-3xs">
                  <span className="truncate text-zp-gray break-keep max-w-20">
                    {room.field_name}
                  </span>
                  |
                  <span className="text-zp-gray break-keep">
                    {room.temperature}&deg;C
                  </span>
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
