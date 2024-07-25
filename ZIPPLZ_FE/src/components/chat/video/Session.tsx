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
          <p className="text-zp-white">Waiting for subscriber...</p>
        </div>
      )}
    </div>
  );
}
