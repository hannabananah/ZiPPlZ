import React, { ChangeEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import Circle from '@assets/gradient-circle.svg?react';
import Input from '@components/common/Input';
import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface TextInputBoxProps {
  isMenuVisible: boolean;
  onMenuToggle: () => void;
}

export default function TextInputBox({
  isMenuVisible,
  onMenuToggle,
}: TextInputBoxProps) {
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
    <div className="sticky bottom-0 flex items-center justify-between w-full h-12 gap-3 px-4 bg-zp-transparent">
      <button className="relative" onClick={onMenuToggle}>
        <Circle width={28} height={28} />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <FaPlus
            size={14}
            style={{
              transform: isMenuVisible ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          />
        </div>
      </button>

      <Input
        type="text"
        placeholder="메시지를 입력해주세요."
        inputType="normal"
        height={2}
        className="flex-1"
        fontSize="sm"
        radius="btn"
        width="full"
        value={message}
        onChange={handleChangeText}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleClickSubmit();
        }}
      />

      <button type="button" onClick={handleClickSubmit}>
        <FiSend size={20} stroke="#73744A" />
      </button>
    </div>
  );
}
