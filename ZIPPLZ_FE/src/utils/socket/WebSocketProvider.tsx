import { ReactNode, createContext, useEffect, useState } from 'react';

import { Client, IMessage } from '@stomp/stompjs';
import { useLoginUserStore } from '@stores/loginUserStore';

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;

interface ChatMessageData {
  type: 'TALK' | 'IMAGE' | 'FILE';
  chatroomSerial: number;
  userSerial: number;
  chatMessageContent: string;
  isFile: boolean;
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
        stompClient.subscribe('/sub/chat/room/1', (message: IMessage) => {
          if (message.body) {
            try {
              const msg: ChatMessageData = JSON.parse(message.body);
              console.log('msg.type=======>', msg.type);
              setMessages(() => [msg]);
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          }
        });

        stompClient.publish({
          destination: '/pub/chat/enter',
          headers: { 'X-AUTH-TOKEN': storedToken },
          body: JSON.stringify({
            chatroomSerial: 1,
            userSerial: { userSerial },
          }),
        });
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
  }, []);

  const sendMessage = (msg: string, userSerial: number, file?: File) => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      console.error('Token not found in localStorage.');
      return;
    }
    if (client?.connected) {
      if (file) {
        console.log('Sending file:', file);

        const reader = new FileReader();
        reader.onloadend = () => {
          const fileData = reader.result as string;
          const base64String = fileData.split(',')[1];
          const fileType = file.type.startsWith('image/') ? 'IMAGE' : 'FILE';

          const messagePayload = {
            type: fileType,
            chatroomSerial: 1,
            chatMessageContent: base64String,
            userSerial,
            isFile: true,
            originalFileName: file.name,
          };

          client.publish({
            destination: '/pub/chat/message',
            headers: { 'X-AUTH-TOKEN': storedToken },
            body: JSON.stringify(messagePayload),
          });
        };

        reader.readAsDataURL(file);
      } else {
        const messagePayload = {
          type: 'TALK',
          chatroomSerial: 1,
          userSerial,
          chatMessageContent: msg,
          isFile: false,
        };

        client.publish({
          destination: '/pub/chat/message',
          headers: { 'X-AUTH-TOKEN': storedToken },
          body: JSON.stringify(messagePayload),
        });
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
