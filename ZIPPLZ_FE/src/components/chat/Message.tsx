import { useContext, useEffect, useState } from 'react';

import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface MessageProps {
  roomId: number;
}

export default function Message({ roomId }: MessageProps) {
  const ws = useContext(WebSocketContext);
  const [items, setItems] = useState<string[]>([]);

  const addItem = (item: string) => {
    setItems([...items, item]);
  };

  useEffect(() => {
    ws.current.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      if (data.roomId === roomId) {
        addItem(data.chat);
      }
    };
  }, [roomId, ws]);

  return (
    <ul>
      {items.map((message, index) => {
        return (
          <li
            key={index}
            className="flex flex-col w-full max-w-[380px] leading-1.5 p-4 border-zp-gray bg-white rounded-e-zp-radius-bubble rounded-es-zp-radius-bubble items-center space-x-2 rtl:space-x-reverse"
          >
            <p className="text-zp-md py-2.5">{message}</p>
            <span className="text-zp-2xs text-zp-light-gray">시간</span>
          </li>
        );
      })}
    </ul>
  );
}
