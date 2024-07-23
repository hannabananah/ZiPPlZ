import { useParams } from 'react-router-dom';

import Message from '@/components/chat/Message';
import TextInputBox from '@components/chat/TextInputBox';
import ChatRoomHeader from '@components/layout/ChatRoomHeader';
import WebSocketProvider from '@utils/socket/WebSocketProvider';

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId?: string }>();

  const roomIdNumber = roomId ? parseInt(roomId, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);

  return (
    <div className="flex flex-col h-full">
      {isValidRoomId && <ChatRoomHeader />}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {isValidRoomId ? (
          <>
            <h2 className="mb-4 text-xl font-bold">ChatRoom {roomId}</h2>
            <WebSocketProvider>
              <div className="flex-grow overflow-y-auto">
                <Message roomId={roomIdNumber} />
              </div>
              <TextInputBox />
            </WebSocketProvider>
          </>
        ) : (
          <p className="text-red-500">Invalid room ID</p>
        )}
      </div>
    </div>
  );
}
