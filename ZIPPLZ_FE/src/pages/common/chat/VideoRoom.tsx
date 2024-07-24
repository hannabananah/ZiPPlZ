import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Session from '@components/chat/video/Session';
import { useChatStore } from '@store/chatStore';
import axios, { AxiosError } from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  Subscriber,
} from 'openvidu-browser';

const sampleUser = {
  userSerial: 1,
  fileSerial: 101,
  email: 'user@example.com',
  password: 'password123',
  userName: 'John Doe',
  tel: '123-456-7890',
  birthDate: new Date('1990-01-01'),
  delYn: 0,
};

export default function VideoRoom() {
  const [session, setSession] = useState<OVSession | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const navigate = useNavigate();
  const selectedChatRoom = useChatStore((state) => state.selectedChatRoom);

  const OPENVIDU_SERVER_URL = `http://${window.location.hostname}:4443`;
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const user = sampleUser;
  const sessionId = user?.userSerial.toString();

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
      navigate(`/chatrooms/${selectedChatRoom?.id}`);
    }

    setOV(null);
    setSession(null);
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (!session || !OV) return;

    const initializeSession = async () => {
      const createSession = async (sessionId: string): Promise<string> => {
        try {
          const data = JSON.stringify({ customSessionId: sessionId });
          const response = await axios.post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
                'Content-Type': 'application/json',
              },
            }
          );
          return (response.data as { id: string }).id;
        } catch (error) {
          const errorResponse = (error as AxiosError)?.response;
          if (errorResponse?.status === 409) {
            return sessionId;
          }
          console.error('Failed to create session:', errorResponse);
          throw new Error('Failed to create session.');
        }
      };

      const createToken = async (sessionId: string): Promise<string> => {
        try {
          const data = {};
          const response = await axios.post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
                'Content-Type': 'application/json',
              },
            }
          );
          return (response.data as { token: string }).token;
        } catch (error) {
          console.error('Failed to create token:', error);
          throw new Error('Failed to create token.');
        }
      };

      const getToken = async (): Promise<string> => {
        try {
          const sessionIds = await createSession(sessionId);
          const token = await createToken(sessionIds);
          return token;
        } catch (error) {
          throw new Error('Failed to get token.');
        }
      };

      const joinSession = async () => {
        try {
          const token = await getToken();
          await session.connect(token);

          const publisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          setPublisher(publisher);
          await session.publish(publisher);
        } catch (error) {
          console.error('Failed to join session:', error);
        }
      };

      session.on('streamCreated', (event) => {
        const subscriber = session.subscribe(event.stream, '');
        setSubscriber(subscriber);
      });

      session.on('streamDestroyed', (event) => {
        if (
          subscriber &&
          event.stream.streamId === subscriber.stream.streamId
        ) {
          setSubscriber(null);
        }
      });

      await joinSession();
    };

    initializeSession();
  }, [session, OV, OPENVIDU_SERVER_URL, sessionId]);

  useEffect(() => {
    const OV = new OpenVidu();
    setOV(OV);
    const session = OV.initSession();
    setSession(session);

    return () => {
      if (session) {
        session.disconnect();
      }
    };
  }, []);

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
