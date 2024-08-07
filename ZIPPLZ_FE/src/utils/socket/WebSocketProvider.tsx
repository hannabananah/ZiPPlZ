import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { Client, IMessage } from '@stomp/stompjs';

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;
const token = import.meta.env.VITE_APP_AUTH_TOKEN;

interface ChatMessage {
  type: string;
  userSerial: number;
  userName: string;
  chatMessageContent: string;
  createdAt: string;
  isFile: boolean;
}

interface WebSocketContextType {
  sendMessage: (message: string, userSerial: number) => void;
  messages: ChatMessage[];
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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
              const msg: ChatMessage = JSON.parse(message.body);
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
        console.log('STOMP disconnected');
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
      console.error('Client not connected or message is empty');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
