import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatRoomHeader from '@components/chat/ChatRoomHeader';
import Message from '@components/chat/Message';
import TextInputBox from '@components/chat/TextInputBox';
import ToggleChatMenu from '@components/chat/ToggleChatMenu';
import { useChatStore } from '@stores/chatStore';
import {
  WebSocketContext,
  WebSocketProvider,
} from '@utils/socket/WebSocketProvider';
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

function ChatRoomContent() {
  const { chatRoomSerial } = useParams<{ chatRoomSerial?: string }>();
  const roomIdNumber = chatRoomSerial ? parseInt(chatRoomSerial, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { messages: contextMessages } = useContext(WebSocketContext) || {
    messages: [],
  };

  const { selectedChatRoom, setSelectedChatRoom } = useChatStore();

  const fetchChatRoomDetails = async (chatRoomSerial: number) => {
    try {
      const response = await axios.get(
        `${base_url}/chatroom/${chatRoomSerial}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const chatRoomData = {
          chatroom_serial: chatRoomSerial,
          message: '',
          field_name: response.data.fieldName,
          worker_name: response.data.userName,
          customer_name: response.data.workerLocation,
          temperature: 0,
          time: '',
          unread: 0,
          certificated: response.data.certificated,
          imageUrl: '',
        };

        setSelectedChatRoom(chatRoomData);

        return response.data;
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching chat room details:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
      throw error;
    }
  };

  useEffect(() => {
    if (isValidRoomId) {
      fetchChatRoomDetails(roomIdNumber)
        .then((data) => {
          setMessages(data.chatMessages);
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.error('Error fetching chat room details:', error.message);
          } else {
            console.error('An unknown error occurred:', error);
          }
        });
    }
  }, [roomIdNumber, isValidRoomId]);

  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, ...contextMessages]);
  }, [contextMessages]);

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file);
  };

  return (
    <div className="relative flex flex-col h-screen bg-zp-light-orange">
      {isValidRoomId && selectedChatRoom && (
        <ChatRoomHeader
          userName={selectedChatRoom.worker_name}
          certificated={selectedChatRoom.certificated}
          area={selectedChatRoom.customer_name}
          fieldName={selectedChatRoom.field_name}
        />
      )}
      <div className="relative flex flex-col flex-grow pt-4 overflow-y-auto">
        {isValidRoomId ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {messages &&
                messages.map((msg, index) => (
                  <Message key={`${msg.createdAt}-${index}`} message={msg} />
                ))}
            </div>
            <TextInputBox
              isMenuVisible={isMenuVisible}
              onMenuToggle={() => setMenuVisible(!isMenuVisible)}
              userSerial={1}
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
  );
}

export default function ChatRoom() {
  return (
    <WebSocketProvider>
      <ChatRoomContent />
    </WebSocketProvider>
  );
}
