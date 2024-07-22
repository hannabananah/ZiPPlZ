import { useParams } from 'react-router-dom';

import Message from '@/components/chat/Message';
import TextInputBox from '@components/chat/TextInputBox';
import ChatRoomHeader from '@components/layout/ChatRoomHeader';
import WebSocketProvider from '@utils/socket/WebSocketProvider';

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId?: string }>();

  const roomIdNumber = roomId ? parseInt(roomId, 10) : NaN;

  return (
    <div className="h-full">
      <ChatRoomHeader />
      <h2>ChatRoom{roomId}</h2>
      <WebSocketProvider>
        <div className="flex-grow overflow-y-auto">
          {!isNaN(roomIdNumber) && <Message roomId={roomIdNumber} />}
        </div>
        <TextInputBox />
      </WebSocketProvider>
    </div>
  );
}
