import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios, { AxiosError } from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  StreamEvent,
  Subscriber,
} from 'openvidu-browser';

const base_url = import.meta.env.VITE_APP_BASE_URL;

export default function useOpenVidu() {
  const { chatroomSerial } = useParams<{ chatroomSerial?: string }>();
  const [session, setSession] = useState<OVSession | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber[]>([]);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [screenPublisher, setScreenPublisher] = useState<Publisher | null>(
    null
  );

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    const newSession = OVs.initSession();
    setSession(newSession);

    newSession.on('streamCreated', (event: StreamEvent) => {
      const stream = event.stream;
      const isScreenShare = stream.typeOfVideo === 'SCREEN';
      const newSubscriber = newSession.subscribe(event.stream, undefined);

      if (isScreenShare) {
        setSubscriber((subs) => [newSubscriber, ...subs]);
      } else {
        setSubscriber((subs) => [...subs, newSubscriber]);
      }
    });
  };

  useEffect(() => {
    if (chatroomSerial) {
      setSessionId(String(chatroomSerial));
      joinSession();
    }
  }, [chatroomSerial]);

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession(null);
    setSessionId('');
    setSubscriber([]);
    setPublisher(null);
    setScreenPublisher(null);
    console.log('Session ended successfully');
  }, [session]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (!session) return;

    const handleStreamDestroyed = (event: StreamEvent) => {
      setSubscriber((subs) =>
        subs.filter((sub) => sub.stream !== event.stream)
      );
    };

    session.on('streamDestroyed', handleStreamDestroyed);

    return () => {
      session.off('streamDestroyed', handleStreamDestroyed);
    };
  }, [session]);

  let token = '';

  useEffect(() => {
    if (!session) return;

    const createSession = async (sessionIds: string) => {
      try {
        const data = JSON.stringify({
          customSessionId: sessionIds,
          chatroomSerial: Number(chatroomSerial),
        });
        const response = await axios.post(
          `${base_url}/openvidu/api/sessions`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response);
          console.error('Error message:', error.message);
          console.error('Error config:', error.config);
        } else {
          console.error('Unexpected error:', error);
        }
        const errorResponse = (error as AxiosError)?.response;
        if (errorResponse?.status === 409) {
          return sessionIds;
        }
        throw new Error('세션 생성에 실패했습니다.');
      }
    };

    const createToken = async (sessionIds: string) => {
      try {
        const data = JSON.stringify({
          role: 'PUBLISHER',
          sessionId: sessionIds,
          chatroomSerial: Number(chatroomSerial),
        });
        const response = await axios.post(
          `${base_url}/openvidu/api/sessions/connections`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.data.proc.code === 200) {
          return response.data.data;
        } else {
          throw new Error(response.data.proc.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
        throw new Error('Failed to create token.');
      }
    };

    const getToken = async (): Promise<string> => {
      try {
        const sessionIds = await createSession(sessionId);
        token = await createToken(sessionIds);
        console.log('토큰 받았다!!!!!!');
        return token;
      } catch (error) {
        throw new Error('Failed to get token.');
      }
    };

    getToken()
      .then((token) => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publisher = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                mirror: true,
              });
              setPublisher(publisher);
              session
                .publish(publisher)
                .catch((error) => console.error('Error publishing:', error));
            }
          })
          .catch((error) => console.error('Error connecting session:', error));
      })
      .catch((error) => console.error('Error getting token:', error));
  }, [session, OV, sessionId]);

  const startScreenShare = useCallback(() => {
    if (OV && session && !screenPublisher) {
      const screenPub = OV.initPublisher(undefined, {
        videoSource: 'screen',
        publishAudio: false,
        mirror: false,
      });

      screenPub.once('accessAllowed', () => {
        session.publish(screenPub);
        setScreenPublisher(screenPub);
      });

      screenPub.once('accessDenied', () => {
        console.warn('Screen share access denied');
      });
    }
  }, [OV, session, screenPublisher]);

  const stopScreenShare = useCallback(() => {
    if (screenPublisher) {
      session?.unpublish(screenPublisher);
      setScreenPublisher(null);
    }
  }, [screenPublisher, session]);

  return {
    session,
    publisher,
    subscriber,
    leaveSession,
    joinSession,
    setSubscriber,
    setPublisher,
    OV,
    startScreenShare,
    stopScreenShare,
  };
}
