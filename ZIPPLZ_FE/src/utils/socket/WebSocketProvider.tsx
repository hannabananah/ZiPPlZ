import { ReactNode, createContext, useEffect, useState } from 'react';

import type { ChatMessageData } from '@/types';
import { Client, IMessage } from '@stomp/stompjs';

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;
const token = import.meta.env.VITE_APP_AUTH_TOKEN;

interface WebSocketContextType {
  sendMessage: (message: string, userSerial: number, file?: File) => void;
  messages: ChatMessageData[];
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: chat_base_url,
      connectHeaders: {
        'X-AUTH-TOKEN': token,
      },
      debug: (msg) => console.log('STOMP debug:', msg),
      onConnect: (frame) => {
        console.log('STOMP connected:', frame);
        stompClient.subscribe(`/sub/chat/room/1`, (message: IMessage) => {
          if (message.body) {
            try {
              const msg: ChatMessageData = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, msg]);
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          }
        });

        stompClient.publish({
          destination: '/pub/chat/enter',
          headers: { 'X-AUTH-TOKEN': token },
          body: JSON.stringify({ chatroomSerial: 1, userSerial: 1 }),
        });
      },
      onDisconnect: () => {
        console.log('STOMP 연결이 끊어졌습니다.');
      },
      onStompError: (frame) => {
        console.error('STOMP 에러가 납니다.', frame);
      },
      onWebSocketClose: (frame) => {
        console.error('WebSocket이 닫혔습니다.', frame);
      },
      onWebSocketError: (frame) => {
        console.error('WebSocket에서 에러가 납니다.', frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (msg: string, userSerial: number, file?: File) => {
    if (client?.connected) {
      const messagePayload = {
        chatroomSerial: 1,
        userSerial,
        chatMessageContent: msg,
        isFile: !!file,
      };

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileData = reader.result as string;
          const data = JSON.stringify({
            ...messagePayload,
            type: 'FILE',
            fileData,
            fileName: file.name,
            fileType: file.type,
          });

          client.publish({
            destination: '/pub/chat/message/customer',
            body: data,
          });
        };
        reader.readAsDataURL(file);
      } else {
        if (msg.trim()) {
          const data = JSON.stringify({
            ...messagePayload,
            type: 'TALK',
            chatMessageContent: msg,
          });

          client.publish({
            destination: '/pub/chat/message/customer',
            body: data,
          });
        }
      }
    } else {
      console.error('Client not connected or message is empty.');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
