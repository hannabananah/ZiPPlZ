import Options from '@components/chat/video/Options';
import Session from '@components/chat/video/Session';
import { useOpenVidu } from '@hooks/useOpenvidu';
import { Publisher, Subscriber } from 'openvidu-browser';

export default function VideoRoom() {
  const { publisher, subscriber, leaveSession } = useOpenVidu();

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen text-white bg-zp-light-orange">
      <div className="flex flex-col w-full">
        <Session
          publisher={publisher as Publisher}
          subscriber={subscriber as Subscriber}
        />
      </div>
      <Options leaveSession={leaveSession} />
    </div>
  );
}
