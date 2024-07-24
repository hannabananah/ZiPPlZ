import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useChatStore } from '@stores/chatStore';
import axios, { AxiosError } from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  Subscriber,
} from 'openvidu-browser';

const OPENVIDU_SERVER_URL = `http://${window.location.hostname}:4443`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

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

const sessionId = sampleUser.userSerial.toString();

export function useOpenVidu() {
  const [session, setSession] = useState<OVSession | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const navigate = useNavigate();
  const selectedChatRoom = useChatStore((state) => state.selectedChatRoom);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
      navigate(`/chatrooms/${selectedChatRoom?.id}`);
    }

    setOV(null);
    setSession(null);
    setSubscriber(null);
    setPublisher(null);
  }, [session, navigate, selectedChatRoom]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (!session || !OV) return;

    const initializeSession = async () => {
      const checkSessionExists = async (
        sessionId: string
      ): Promise<boolean> => {
        try {
          await axios.get(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}`,
            {
              headers: {
                Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
              },
            }
          );
          return true;
        } catch (error) {
          const errorResponse = (error as AxiosError)?.response;
          if (errorResponse?.status === 404) {
            return false;
          }
          console.error('Failed to check session existence:', errorResponse);
          throw new Error('Failed to check session existence.');
        }
      };

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
            return sessionId; // Return existing session ID if conflict occurs
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
          const exists = await checkSessionExists(sessionId);
          const sessionIds = exists
            ? sessionId
            : await createSession(sessionId);
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
  }, [session, OV, sessionId]);

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

  return {
    session,
    publisher,
    subscriber,
    leaveSession,
  };
}
