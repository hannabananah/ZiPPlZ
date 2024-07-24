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
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full space-y-4">
      <div className="flex justify-center w-full basis-1/2 bg-zp-main-color">
        <Video streamManager={publisher} />
      </div>
      <div className="flex justify-center w-full basis-1/2 bg-zp-sub-color">
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
