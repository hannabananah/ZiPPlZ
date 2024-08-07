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

interface OtherUser {
  name: string;
  location: string;
  fieldName: string;
  certificated: boolean;
  image: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  };
}

interface ChatRoomData {
  otherUser: OtherUser;
  chatMessages: ChatMessage[];
}

interface ChatRoom {
  otherUser: OtherUser;
  chatMessages: ChatMessage[];
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

  const fetchChatRoomDetails = async (
    chatRoomSerial: number
  ): Promise<ChatRoom> => {
    try {
      const response = await axios.get<{ data: ChatRoomData }>(
        `${base_url}/chatroom/${chatRoomSerial}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const chatRoomData = response.data.data;
        setSelectedChatRoom(chatRoomData);
        return chatRoomData;
      } else {
        console.error('Unexpected response status:', response.status);
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(
        'Error fetching chat room details:',
        error instanceof Error ? error.message : error
      );
      throw error;
    }
  };
  useEffect(() => {
    if (isValidRoomId) {
      fetchChatRoomDetails(roomIdNumber)
        .then((data) => setMessages(data.chatMessages))
        .catch((error) =>
          console.error('Failed to fetch chat room details:', error)
        );
    }
  }, [roomIdNumber, isValidRoomId]);

  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, ...contextMessages]);
  }, [contextMessages]);

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file);
    // TODO: Implement image upload functionality
  };

  return (
    <div className="relative flex flex-col h-screen bg-zp-light-orange">
      {isValidRoomId && selectedChatRoom && (
        <ChatRoomHeader
          userName={selectedChatRoom.otherUser.name}
          certificated={selectedChatRoom.otherUser.certificated}
          area={selectedChatRoom.otherUser.location}
          fieldName={selectedChatRoom.otherUser.fieldName}
        />
      )}
      <div className="relative flex flex-col flex-grow pt-4 overflow-y-auto">
        {isValidRoomId ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg, index) => (
                <Message key={`${msg.createdAt}-${index}`} message={msg} />
              ))}
            </div>
            <TextInputBox
              isMenuVisible={isMenuVisible}
              onMenuToggle={() => setMenuVisible((prev) => !prev)}
              userSerial={1} // Replace with actual user serial
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
