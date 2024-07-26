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
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full space-y-4">
      <div className="flex justify-center w-full basis-1/2">
        <Video streamManager={publisher} />
      </div>
      <div
        className="flex justify-center w-full basis-1/2"
        key={subscriber?.id}
      >
        {subscriber ? (
          <Video streamManager={subscriber} />
        ) : (
          <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-gray-700 rounded-lg shadow-lg">
            <p className="text-white">Waiting for subscriber...</p>
          </div>
        )}
      </div>
    </div>
  );
}
