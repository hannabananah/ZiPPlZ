import { useEffect, useState } from 'react';

import Video from '@components/chat/video/Video';
import { Publisher, Subscriber } from 'openvidu-browser';

interface SessionProps {
  subscriber: Subscriber;
  publisher: Publisher;
}

export default function Session({ subscriber, publisher }: SessionProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (subscriber) {
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    }
  }, [subscriber]);

  const adjustGridPlacement = (subscriberCount: number) => {
    if (subscriberCount <= 1) {
      return 'center';
    }
    return 'normal';
  };

  const renderSubscribers = () => {
    const gridPlacement = adjustGridPlacement(subscribers.length);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: gridPlacement === 'center' ? '1fr' : '1fr 1fr',
          gap: '20px',
        }}
      >
        <div>
          <Video streamManager={publisher} />
        </div>
        {subscribers.map((subscriberItem) => (
          <div key={subscriberItem.id}>
            <Video streamManager={subscriberItem} />
          </div>
        ))}
      </div>
    );
  };

  return <>{renderSubscribers()}</>;
}
