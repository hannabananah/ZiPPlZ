import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { Client, IMessage } from '@stomp/stompjs';

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;
const chat_token = import.meta.env.VITE_APP_CHAT_TOKEN;

const WebSocketContext = createContext<{
  sendMessage: (message: string) => void;
  messages: string[];
} | null>(null);

const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: chat_base_url,
      connectHeaders: {
        'X-AUTH-TOKEN': chat_token,
      },
      debug: (msg) => console.log('STOMP debug:', msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('STOMP connected>_<', frame);
        stompClient.subscribe('/sub/chat/room/1', (message: IMessage) => {
          console.log('Subscription received+++++>>>>>', message);
          try {
            if (message.body) {
              let msg = JSON.parse(message.body);
              console.log('Parsed message:', msg);
              setMessages((chats) => [...chats, msg]);
            }
          } catch (error) {
            console.error('Error parsing message:', error);
          }
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

  // 메시지 보내기
  const sendMessage = (msg: string) => {
    if (msg.trim()) {
      if (client && client.connected) {
        const data = JSON.stringify({
          chatMessageContent: msg,
          chatroomSerial: 1,
          userSerial: 1,
        });
        client.publish({
          destination: '/pub/chat/message',
          body: data,
        });
        console.log('Message sent:', msg);
        console.log('Data sent:', data);
      } else {
        console.error('Client not connected or client is null');
      }
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
