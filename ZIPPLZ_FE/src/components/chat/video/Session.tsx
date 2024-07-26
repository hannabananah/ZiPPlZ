import { useEffect, useRef } from 'react';

import { Publisher, Subscriber } from 'openvidu-browser';

import Video from './Video';

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
  const publisherRef = useRef<HTMLVideoElement>(null);
  const subscriberRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (subscriber) {
      setSubscriber(subscriber);
    }
  }, [subscriber]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-4 space-y-4 overflow-hidden">
      <div className={`relative flex-1 ${subscriber ? '' : 'blur'}`}>
        <Video streamManager={publisher} ref={publisherRef} />
      </div>
      {subscriber ? (
        <div className="relative flex-1">
          <Video streamManager={subscriber} ref={subscriberRef} />
        </div>
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full ">
          <p className="text-zp-white">상대방이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
