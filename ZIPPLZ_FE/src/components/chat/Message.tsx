import React, { useContext } from 'react';

import { WebSocketContext } from '@utils/socket/WebSocketProvider';

const Message: React.FC = () => {
  const context = useContext(WebSocketContext);
  console.log('context', context);

  if (!context) return <p>Loading...</p>;

  const { messages } = context;

  return (
    <ul className="space-y-2">
      {messages.map((msg, index) => (
        <li key={index} className="p-2 text-gray-800 bg-blue-100 rounded-lg">
          {msg}
        </li>
      ))}
    </ul>
  );
};

export default Message;
