import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatRoomHeader from '@components/chat/ChatRoomHeader';
import Message from '@components/chat/Message';
import TextInputBox from '@components/chat/TextInputBox';
import ToggleChatMenu from '@components/chat/ToggleChatMenu';
import { Client } from '@stomp/stompjs';
import WebSocketProvider, {
  WebSocketContext,
} from '@utils/socket/WebSocketProvider';

const chat_base_url = 'ws://localhost:5000/ws';
const chat_token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTcwMzU3MjczOSwiZXhwIjoxNzA0MTc3NTM5fQ.XdcltGt2MDyTnv1kfZghwdYeEZUNyiBEzGB4qUmMma8';

export default function ChatRoom() {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const { roomId } = useParams<{ roomId?: string }>();

  const roomIdNumber = roomId ? parseInt(roomId, 10) : NaN;
  const isValidRoomId = !isNaN(roomIdNumber);

  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const stomp = new Client({
      brokerURL: chat_base_url,
      connectHeaders: {
        'X-AUTH-TOKEN': chat_token,
      },
      debug: (str: string) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stomp.onConnect = () => {
      console.log('Connected to STOMP');
      stomp.subscribe(`/sub/chat/room`, (message) => {
        console.log('Received message:', message.body);
      });
    };

    stomp.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };

    stomp.activate();
    setStompClient(stomp);

    return () => {
      stomp.deactivate();
    };
  }, []);

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
          <p className="bg-zp-gray">Invalid room ID</p>
        )}
      </div>
    </div>
  );
}
