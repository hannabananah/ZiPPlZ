import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatRoomHeader from '@components/chat/ChatRoomHeader';
import Message from '@components/chat/Message';
import TextInputBox from '@components/chat/TextInputBox';
import ToggleChatMenu from '@components/chat/ToggleChatMenu';
import { WebSocketProvider } from '@utils/socket/WebSocketProvider';
import axios from 'axios';

interface ChatMessage {
  userSerial: number;
  userName: string;
  chatMessageContent: string;
  createdAt: string;
  isFile: boolean;
}

const base_url = import.meta.env.VITE_APP_BASE_URL;
const token = import.meta.env.VITE_APP_AUTH_TOKEN;

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId?: string }>();
  const roomIdNumber = roomId ? parseInt(roomId, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const userSerial = 1;

  const fetchChatRoomDetails = async (chatroomSerial: number) => {
    try {
      const response = await axios.get(
        `${base_url}/chatroom/${chatroomSerial}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching chat room details:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (isValidRoomId) {
      fetchChatRoomDetails(roomIdNumber)
        .then((data) => {
          setMessages(data.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [roomIdNumber, isValidRoomId]);

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file);
  };

  return (
    <WebSocketProvider>
      <div className="relative flex flex-col h-screen bg-zp-light-orange">
        {isValidRoomId && <ChatRoomHeader />}
        <div className="relative flex flex-col flex-grow pt-4 overflow-y-auto">
          {isValidRoomId ? (
            <>
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                  <Message key={msg.createdAt} message={msg} />
                ))}
              </div>
              <TextInputBox
                isMenuVisible={isMenuVisible}
                onMenuToggle={() => setMenuVisible(!isMenuVisible)}
                userSerial={userSerial}
                onImageUpload={handleImageUpload}
                type="text"
              />
              {isMenuVisible && <ToggleChatMenu />}
            </>
          ) : (
            <p className="py-4 text-center bg-gray-300">Invalid room ID</p>
          )}
        </div>
      </div>
    </WebSocketProvider>
  );
}
