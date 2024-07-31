import React, { ReactNode, useEffect, useState } from 'react';

import { Client } from '@stomp/stompjs';

const WebSocketContext = React.createContext<Client | null>(null);
export { WebSocketContext };

const chat_base_url = import.meta.env.VITE_APP_CHAT_URL;
const chat_token = import.meta.env.VITE_APP_CHAT_TOKEN;

const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: chat_base_url,
      connectHeaders: {
        'X-AUTH-TOKEN': chat_token,
      },
      debug: (msg) => console.log('STOMP debug:', msg),
      onConnect: () => {
        console.log('STOMP connected');
      },
      onDisconnect: () => {
        console.log('STOMP disconnected');
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
