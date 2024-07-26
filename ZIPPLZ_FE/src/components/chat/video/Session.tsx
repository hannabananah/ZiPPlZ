import { useEffect } from 'react';

import Video from '@components/chat/video/Video';
import { Publisher, Subscriber } from 'openvidu-browser';

interface SessionProps {
  subscriber: Subscriber | null;
  publisher: Publisher;
  setSubscriber: (subscriber: Subscriber | null) => void;
}

export default function Session({
  subscriber,
  setSubscriber,
  publisher,
}: SessionProps) {
  useEffect(() => {
    if (subscriber) {
      setSubscriber(subscriber);
    }
  }, [subscriber]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-4 space-y-4 overflow-hidden">
      <div className={`relative flex-1 ${subscriber ? '' : 'blur'}`}>
        <Video streamManager={publisher} />
      </div>
      {subscriber ? (
        <div className="relative flex-1">
          <Video streamManager={subscriber} />
        </div>
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full ">
          <p className="text-zp-white">상대방이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
