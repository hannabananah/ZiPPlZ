import { PiChatsCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import Circle from '@assets/gradient-circle.svg?react';

export default function FloatingChatButton() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate('/chatrooms');
        }}
        className="absolute right-4 drop-shadow-zp-deep bottom-24"
      >
        <Circle />
        <div className="absolute transform -translate-x-1/2 -translate-y-[14px] top-1/2 left-1/2">
          <PiChatsCircleFill size={24} />
        </div>
      </button>
    </>
  );
}
