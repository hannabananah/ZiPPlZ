import Session from '@components/chat/video/Session';
import { useOpenVidu } from '@hooks/useOpenvidu';
import { Publisher, Subscriber } from 'openvidu-browser';

export default function VideoRoom() {
  const { publisher, subscriber, leaveSession } = useOpenVidu();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      <h1 className="mb-4 text-2xl font-bold">Video Chat</h1>
      <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <Session
          publisher={publisher as Publisher}
          subscriber={subscriber as Subscriber}
        />
        <button
          onClick={leaveSession}
          className="px-4 py-2 mt-4 transition bg-red-600 rounded hover:bg-red-700"
        >
          화상채팅 나가기
        </button>
      </div>
    </div>
  );
}
