import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Message from '@/components/chat/Message';
import TextInputBox from '@components/chat/TextInputBox';
import ToggleChatMenu from '@components/chat/ToggleChatMenu';
import ChatRoomHeader from '@components/layout/ChatRoomHeader';
import WebSocketProvider from '@utils/socket/WebSocketProvider';

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId?: string }>();

  const roomIdNumber = roomId ? parseInt(roomId, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);

  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <div className="flex flex-col bg-zp-light-orange min-h-screen max-h-screen overflow-y-auto relative">
      {isValidRoomId && <ChatRoomHeader />}
      <div className="flex flex-col flex-grow overflow-y-auto relative">
        {isValidRoomId ? (
          <>
            <WebSocketProvider>
              <div className="flex-grow overflow-y-auto">
                <Message roomId={roomIdNumber} />
              </div>
              <TextInputBox
                onMenuToggle={() => setMenuVisible(!isMenuVisible)}
              />
              {isMenuVisible && <ToggleChatMenu />}
            </WebSocketProvider>
          </>
        ) : (
          <p className="text-red-500">Invalid room ID</p>
        )}
      </div>
    </div>
  );
}
