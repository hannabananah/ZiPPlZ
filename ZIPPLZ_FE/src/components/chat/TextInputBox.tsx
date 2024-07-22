import { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import Circle from '@assets/gradient-circle.svg?react';
import { WebSocketContext } from '@utils/socket/WebSocketProvider';

export default function TextInputBox() {
  const [message, setMessage] = useState('');
  const ws = useContext(WebSocketContext);

  const handleChangeText = (e: any) => {
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
    <div className="absolute bottom-20 w-full px-[25px] flex justify-between gap-4">
      <button className="relative">
        <Circle />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <FaPlus size={18} />
        </div>
      </button>

      <input
        className="flex-1 px-2 caret-zp-main-color placeholder-zp-main-color focus:outline-none"
        type="text"
        value={message}
        onChange={handleChangeText}
        placeholder="메시지를 입력해주세요."
      ></input>

      <button type="button" onClick={handleClickSubmit}>
        <FiSend size={32} stroke="#73744A" />
      </button>
    </div>
  );
}
