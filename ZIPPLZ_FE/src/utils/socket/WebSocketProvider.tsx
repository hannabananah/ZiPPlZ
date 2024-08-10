import { ReactNode, createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { ChatMessageData } from '@/types';
import { Client, IMessage } from '@stomp/stompjs';
import { useLoginUserStore } from '@stores/loginUserStore';
import axios from 'axios';

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;
const base_url = import.meta.env.VITE_APP_BASE_URL;

interface WebSocketContextType {
  sendMessage: (
    msg: string,
    userSerial: number,
    file?: File,
    // originalFileName?: string,
    type?: 'TALK' | 'IMAGE' | 'FILE'
  ) => void;
  messages: ChatMessageData[];
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const { chatroomSerial } = useParams<{ chatroomSerial?: string }>();
  const { loginUser } = useLoginUserStore();
  const userSerial: number | undefined = loginUser?.userSerial;

  useEffect(() => {
    const fetchInitialMessages = async () => {
      if (!chatroomSerial) return;
      try {
        const response = await axios.get<{
          data: { chatMessages: ChatMessageData[] };
        }>(`${base_url}/chatroom/${chatroomSerial}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.status === 200) {
          console.log('response', response);
          console.log('response', response.data);
          console.log('response', response.data.data);
          setMessages(response.data.data.chatMessages);
        }
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };

    fetchInitialMessages();

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      console.error('Token not found in localStorage.');
      return;
    }

    const stompClient = new Client({
      brokerURL: chat_base_url,
      connectHeaders: {
        'X-AUTH-TOKEN': storedToken,
      },
      debug: (msg) => console.log('STOMP debug:', msg),
      onConnect: (frame) => {
        console.log('STOMP connected:', frame);
        stompClient.subscribe(
          `/sub/chat/room/${chatroomSerial}`,
          (message: IMessage) => {
            if (message.body) {
              console.log('message===body======>', message.body);
              try {
                const msg: ChatMessageData = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, msg]);
              } catch (error) {
                console.error('Error parsing message:', error);
              }
            }
          }
        );

        stompClient.publish({
          destination: '/pub/chat/enter',
          headers: { 'X-AUTH-TOKEN': storedToken },
          body: JSON.stringify({ chatroomSerial }),
        });
        console.log('Entered chat room!');
      },
      onDisconnect: () => {
        console.log('STOMP connection disconnected.');
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      onWebSocketClose: (frame) => {
        console.error('WebSocket closed:', frame);
      },
      onWebSocketError: (frame) => {
        console.error('WebSocket error:', frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [chatroomSerial]);

  const sendMessage = (
    msg: string,
    userSerial: number,
    file?: File,
    // originalFileName: string,
    type: 'TALK' | 'IMAGE' | 'FILE' = 'TALK'
  ) => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      console.error('Token not found in localStorage.');
      return;
    }

    const messagePayload = {
      type,
      chatroomSerial,
      userSerial,
      // chatMessageContent: type === 'TALK' ? msg : file ? '' : msg,
      chatMessageContent: msg,
      isFile: type === 'IMAGE' || type === 'FILE',
      originalFileName: file?.name,
      // originalFileName,
    };

    if (type === 'IMAGE' && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        messagePayload.chatMessageContent = base64Data;
        client?.publish({
          destination: '/pub/chat/message',
          headers: { 'X-AUTH-TOKEN': storedToken },
          body: JSON.stringify(messagePayload),
        });
      };
      reader.readAsDataURL(file as Blob);
    } else if (type === 'FILE' && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        messagePayload.chatMessageContent = base64Data;
        client?.publish({
          destination: '/pub/chat/message',
          headers: { 'X-AUTH-TOKEN': storedToken },
          body: JSON.stringify(messagePayload),
        });
      };
      reader.readAsText(file);
    } else {
      client?.publish({
        destination: '/pub/chat/message',
        headers: { 'X-AUTH-TOKEN': storedToken },
        body: JSON.stringify(messagePayload),
      });
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
