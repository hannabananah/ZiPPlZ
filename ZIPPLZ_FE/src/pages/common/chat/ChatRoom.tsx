import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { ChatMessageData, ChatRoomDetails, File } from '@/types';
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

const base_url = import.meta.env.VITE_APP_BASE_URL;
const token = import.meta.env.VITE_APP_AUTH_TOKEN;

function ChatRoomContent() {
  const { chatRoomSerial } = useParams<{ chatRoomSerial?: string }>();
  const roomIdNumber = chatRoomSerial ? parseInt(chatRoomSerial, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { selectedChatRoom, setSelectedChatRoom } = useChatStore();
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const { messages: contextMessages } = useContext(WebSocketContext) || {
    messages: [],
  };
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchChatRoomDetails = async (
    chatRoomSerial: number
  ): Promise<ChatRoomDetails> => {
    try {
      const response = await axios.get<{ data: ChatRoomDetails }>(
        `${base_url}/chatroom/${chatRoomSerial}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error('예상치 못한 응답입니다.');
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
      setLoading(true);
      fetchChatRoomDetails(roomIdNumber)
        .then((data) => {
          setMessages(data.chatMessages);
          setSelectedChatRoom(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('채팅방 정보를 불러올 수 없습니다.', error);
          setLoading(false);
        });
    }
  }, [roomIdNumber, isValidRoomId]);

  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, ...contextMessages]);
  }, [contextMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (file: File) => {
    console.log('이미지 업로드:', file);
    // TODO: Implement image upload functionality
  };

  const handleImagePreviewRemove = () => {
    console.log('Image preview removed');
  };

  if (loading) {
    return <p className="py-4 text-center bg-gray-300">Loading...</p>;
  }

  return (
    <div className="relative flex flex-col h-screen bg-zp-light-orange">
      {isValidRoomId && selectedChatRoom && (
        <ChatRoomHeader
          name={selectedChatRoom.otherUser.name}
          certificated={selectedChatRoom.otherUser.certificated}
          location={selectedChatRoom.otherUser.location}
          fieldName={selectedChatRoom.otherUser.fieldName}
          imageUrl={selectedChatRoom.otherUser.image?.saveFile || ''}
        />
      )}
      <div className="relative flex flex-col flex-grow pt-4 overflow-y-auto">
        {isValidRoomId ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg, index) => (
                <Message key={`${msg.createdAt}-${index}`} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <TextInputBox
              isMenuVisible={isMenuVisible}
              onMenuToggle={() => setMenuVisible((prev) => !prev)}
              userSerial={2}
              onImageUpload={handleImageUpload}
              onImagePreviewRemove={handleImagePreviewRemove}
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
