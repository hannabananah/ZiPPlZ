import { useNavigate } from 'react-router-dom';

import Session from '@components/chat/video/Session';
import { useOpenVidu } from '@hooks/useOpenvidu';
import { useVideoStore } from '@stores/videoStore';

export default function VideoRoom() {
  const navigate = useNavigate();
  const { publisher, subscriber, leaveSession } = useVideoStore();

  const handleLeaveSession = () => {
    leaveSession();
    navigate('/');
  };

  useOpenVidu();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      <h1 className="mb-4 text-2xl font-bold">Video Chat</h1>
      <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg">
        {publisher && <Session publisher={publisher} subscriber={subscriber} />}
        <button
          onClick={handleLeaveSession}
          className="px-4 py-2 mt-4 transition bg-red-600 rounded hover:bg-red-700"
        >
          화상채팅방 나가기
        </button>
      </div>
    </div>
  );
}
