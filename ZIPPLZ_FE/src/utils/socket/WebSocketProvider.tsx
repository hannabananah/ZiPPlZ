import { ReactNode, createContext, useEffect, useState } from 'react';

import type { ChatMessageData } from '@/types';
import { Client, IMessage } from '@stomp/stompjs';

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;
const token = import.meta.env.VITE_APP_AUTH_TOKEN;

interface WebSocketContextType {
  sendMessage: (message: string, userSerial: number) => void;
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
              setMessages(() => [msg]);
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

  const sendMessage = (msg: string, userSerial: number) => {
    if (msg.trim() && client?.connected) {
      const data = JSON.stringify({
        type: 'TALK',
        chatMessageContent: msg,
        chatroomSerial: 1,
        userSerial,
        isFile: false,
      });
      client.publish({
        destination: '/pub/chat/message/customer',
        body: data,
      });
    } else {
      console.error('클라이언트와 연결되지 않았거나 메시자 비어 있습니다.');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
