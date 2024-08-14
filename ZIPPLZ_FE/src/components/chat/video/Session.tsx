import { useEffect, useRef } from 'react';

import Video from '@components/chat/video/Video';
import { Publisher, Subscriber } from 'openvidu-browser';

interface SessionProps {
  publisher: Publisher;
  subscriber: Subscriber[];
  setSubscriber: (subscribers: Subscriber[]) => void;
}

export default function Session({
  publisher,
  subscriber,
  setSubscriber,
}: SessionProps) {
  const publisherRef = useRef<HTMLVideoElement>(null);
  const subscriberRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (subscriber.length > 0) {
      setSubscriber(subscriber);
    }
  }, [subscriber, setSubscriber]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full p-4 space-y-4">
      <div
        className={`relative basis-1/3 flex items-start ${subscriber.length === 0 ? 'blur' : ''}`}
      >
        <Video streamManager={publisher} ref={publisherRef} />
      </div>
      {subscriber.length > 0 ? (
        <div className="relative flex items-start basis-2/3">
          <Video streamManager={subscriber[0]} ref={subscriberRef} />
        </div>
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full ">
          <p className="text-zp-white">상대방이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
