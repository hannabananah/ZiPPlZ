import { ChangeEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import Circle from '@assets/gradient-circle.svg?react';
import Input from '@components/common/Input';
import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface TextInputBoxProps {
  onMenuToggle: () => void;
}

export default function TextInputBox({ onMenuToggle }: TextInputBoxProps) {
  const [message, setMessage] = useState('');
  const ws = useContext(WebSocketContext);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
    ws.current.send(
      JSON.stringify({
        chat: message,
      })
    );

    setMessage('');
  };

  return (
    <div className="sticky bottom-0 w-full px-[25px] flex justify-between gap-3 items-center bg-zp-transparent h-12">
      <button className="relative" onClick={onMenuToggle}>
        <Circle width={28} height={28} />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <FaPlus size={14} />
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
        onKeydown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') alert('keydown');
        }}
      />

      <button type="button" onClick={handleClickSubmit}>
        <FiSend size={20} stroke="#73744A" />
      </button>
    </div>
  );
}
