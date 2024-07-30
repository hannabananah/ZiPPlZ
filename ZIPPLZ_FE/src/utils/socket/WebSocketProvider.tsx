import React, { useRef } from 'react';

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default function ({ children }: { children: React.ReactNode }) {
  const webSocketUrl = `ws://localhost:8080/ws`;
  let ws = useRef<WebSocket | null>(null);

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log('WebSocket Url ' + webSocketUrl);
    };
    ws.current.onclose = (error) => {
      console.log('WebSocket 끊김:' + webSocketUrl);
      console.log(error);
    };
    ws.current.onerror = (error) => {
      console.log('WebSocket 연결에러: ' + webSocketUrl);
      console.log(error);
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}
