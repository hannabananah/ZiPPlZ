import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatRoomHeader from '@components/chat/ChatRoomHeader';
import Message from '@components/chat/Message';
import TextInputBox from '@components/chat/TextInputBox';
import ToggleChatMenu from '@components/chat/ToggleChatMenu';
import { WebSocketProvider } from '@utils/socket/WebSocketProvider';

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const roomIdNumber = roomId ? parseInt(roomId, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const userSerial = 1;
  return (
    <WebSocketProvider>
      <div className="relative flex flex-col h-screen bg-zp-light-orange">
        {isValidRoomId && <ChatRoomHeader />}
        <div className="relative flex flex-col flex-grow pt-4 overflow-y-auto">
          {isValidRoomId ? (
            <>
              <div className="flex-1 overflow-y-auto">
                <Message />
              </div>
              <TextInputBox
                isMenuVisible={isMenuVisible}
                onMenuToggle={() => setMenuVisible(!isMenuVisible)}
                userSerial={userSerial}
                // type={type}
              />
              {isMenuVisible && <ToggleChatMenu />}
            </>
          ) : (
            <p className="py-4 text-center bg-gray-300">Invalid room ID</p>
          )}
        </div>
      </div>
    </WebSocketProvider>
  );
};

export default ChatRoom;
