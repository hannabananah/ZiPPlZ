import React, { ChangeEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface TextInputBoxProps {
  isMenuVisible: boolean;
  onMenuToggle: () => void;
}

const TextInputBox: React.FC<TextInputBoxProps> = ({
  isMenuVisible,
  onMenuToggle,
}) => {
  const [message, setMessage] = useState('');
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('TextInputBox must be used within a WebSocketProvider');
  }

  const { sendMessage } = context;

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-between w-full p-3 bg-white border-t border-gray-300">
      <button className="relative" onClick={onMenuToggle}>
        <FaPlus
          size={20}
          className={
            isMenuVisible
              ? 'transform rotate-45 transition-transform'
              : 'transition-transform'
          }
        />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        value={message}
        onChange={handleChangeText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClickSubmit();
        }}
      />
      <button
        type="button"
        onClick={handleClickSubmit}
        className="ml-2 text-blue-600"
      >
        <FiSend size={20} />
      </button>
    </div>
  );
};

export default TextInputBox;
