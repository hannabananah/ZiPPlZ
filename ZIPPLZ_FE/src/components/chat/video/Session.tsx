import { useEffect } from 'react';

import { Publisher, Subscriber } from 'openvidu-browser';

import Video from './Video';

interface SessionProps {
  subscriber: Subscriber | null;
  publisher: Publisher;
}

export default function Session({ subscriber, publisher }: SessionProps) {
  useEffect(() => {}, [subscriber]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800">
      <div className="flex flex-col w-full max-w-4xl p-4 space-y-4">
        <div className="flex justify-center">
          <Video streamManager={publisher} />
        </div>
        {subscriber && (
          <div className="flex justify-center">
            <Video streamManager={subscriber} />
          </div>
        )}
      </div>
    </div>
  );
}
