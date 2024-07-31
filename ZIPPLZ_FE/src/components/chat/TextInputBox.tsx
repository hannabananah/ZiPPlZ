import React, { ChangeEvent, useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface TextInputBoxProps {
  isMenuVisible: boolean;
  onMenuToggle: () => void;
}

const TextInputBox: React.FC<TextInputBoxProps> = () => {
  const [message, setMessage] = useState('');
  const client = useContext(WebSocketContext);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
    if (client) {
      const data = JSON.stringify({
        chatMessageContent: message,
        chatroomSerial: 3,
      });

      client.publish({
        destination: '/pub/chat/message',
        body: data,
      });
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="메시지를 입력해주세요."
        value={message}
        onChange={handleChangeText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClickSubmit();
        }}
      />
      <button type="button" onClick={handleClickSubmit}>
        <FiSend size={20} />
      </button>
    </div>
  );
};

export default TextInputBox;
