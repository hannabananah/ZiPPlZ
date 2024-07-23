import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Message from '@/components/chat/Message';
import ChatRoomHeader from '@components/chat/ChatRoomHeader';
import TextInputBox from '@components/chat/TextInputBox';
import ToggleChatMenu from '@components/chat/ToggleChatMenu';
import WebSocketProvider from '@utils/socket/WebSocketProvider';

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId?: string }>();

  const roomIdNumber = roomId ? parseInt(roomId, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);

  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <div className="relative flex flex-col max-h-screen min-h-screen overflow-y-auto bg-zp-light-orange">
      {isValidRoomId && <ChatRoomHeader />}
      <div className="relative flex flex-col flex-grow overflow-y-auto">
        {isValidRoomId ? (
          <>
            <WebSocketProvider>
              <div className="flex-grow overflow-y-auto">
                <Message roomId={roomIdNumber} />
              </div>
              <TextInputBox
                isMenuVisible={isMenuVisible}
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
