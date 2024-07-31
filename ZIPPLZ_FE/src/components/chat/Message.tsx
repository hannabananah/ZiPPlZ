import React, { useContext, useEffect, useState } from 'react';

import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface MessageProps {
  roomId: number;
}

const Message: React.FC<MessageProps> = ({ roomId }) => {
  const client = useContext(WebSocketContext);
  const [items, setItems] = useState<string[]>([]);

  const addItem = (item: string) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    if (client) {
      const subscription = client.subscribe('/sub/chat/room', (message) => {
        const data = JSON.parse(message.body);
        addItem(data.chatMessageContent);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [client, roomId]);

  return (
    <ul>
      {items.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};

export default Message;
