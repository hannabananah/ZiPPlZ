import { ReactNode, createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Client, IMessage } from '@stomp/stompjs';
import { useLoginUserStore } from '@stores/loginUserStore';

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;

interface ChatMessageData {
  chatroomSerial: number;
  chatMessageContent: string;
  userSerial: number;
  isFile: boolean;
  type: 'TALK' | 'IMAGE' | 'FILE';
  originalFileName?: string;
}

interface WebSocketContextType {
  sendMessage: (msg: string, userSerial: number, file?: File) => void;
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

  const sendMessage = (msg: string, userSerial: number, file?: File) => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      console.error('Token not found in localStorage.');
      return;
    }

    const send = () => {
      const messagePayload = {
        type: 'TALK',
        chatroomSerial,
        userSerial,
        chatMessageContent: msg,
        isFile: false,
      };

      client?.publish({
        destination: '/pub/chat/message',
        headers: { 'X-AUTH-TOKEN': storedToken },
        body: JSON.stringify(messagePayload),
      });
    };

    if (client?.connected) send();
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
