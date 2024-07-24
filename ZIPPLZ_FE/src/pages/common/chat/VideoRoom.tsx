import Session from '@components/chat/video/Session';
import { useOpenVidu } from '@hooks/useOpenvidu';
import { Publisher, Subscriber } from 'openvidu-browser';

export default function VideoRoom() {
  const { publisher, subscriber, leaveSession } = useOpenVidu();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 text-white bg-gray-900">
      <button
        onClick={leaveSession}
        className="px-4 py-2 mb-4 transition bg-red-600 rounded-md hover:bg-red-700"
      >
        화상채팅 나가기
      </button>
      <div className="flex flex-col w-full max-w-[600px] bg-gray-800 rounded-lg shadow-lg">
        <Session
          publisher={publisher as Publisher}
          subscriber={subscriber as Subscriber}
        />
      </div>
    </div>
  );
}
