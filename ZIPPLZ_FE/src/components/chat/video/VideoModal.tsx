import Options from '@components/chat/video/Options';
import Session from '@components/chat/video/Session';
import useOpenVidu from '@hooks/useOpenvidu';
import { Publisher } from 'openvidu-browser';

interface VideoModalProps {
  handleCloseVideo: () => void;
}

export default function VideoModal({ handleCloseVideo }: VideoModalProps) {
  const {
    session,
    publisher,
    subscriber,
    leaveSession,
    setSubscriber,
    setPublisher,
    OV,
  } = useOpenVidu();

  const singleSubscriber = Array.isArray(subscriber)
    ? subscriber[0] // If it's an array, take the first subscriber
    : subscriber; // Otherwise, use the single subscriber or null

  const publishAudio = (enabled: boolean) => {
    if (publisher) {
      publisher.publishAudio(enabled);
    }
  };

  const publishVideo = (enabled: boolean) => {
    if (publisher) {
      publisher.publishVideo(enabled);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen text-white bg-orange-400">
      <div className="flex flex-col w-full h-full rounded-zp-radius-big">
        {session && (
          <Session
            publisher={publisher as Publisher}
            subscriber={subscriber ? [singleSubscriber] : []}
            setSubscriber={setSubscriber}
          />
        )}
      </div>
      <Options
        leaveSession={leaveSession}
        publisher={publisher as Publisher}
        subscriber={singleSubscriber}
        session={session}
        OV={OV}
        setPublisher={setPublisher}
        publishAudio={publishAudio}
        publishVideo={publishVideo}
        handleCloseVideo={handleCloseVideo}
      />
    </div>
  );
}
