import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  StreamEvent,
  Subscriber,
} from 'openvidu-browser';

// const base_url = import.meta.env.VITE_APP_BASE_URL;
const base_url: string = 'https://zipplz.site/api';

export default function useOpenVidu() {
  const { chatroomSerial } = useParams<{ chatroomSerial?: string }>();
  const [session, setSession] = useState<OVSession | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const joinSession = useCallback(() => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
  }, []);

  useEffect(() => {
    if (chatroomSerial) {
      setSessionId(String(chatroomSerial));
      joinSession();
    }
  }, [chatroomSerial, joinSession]);

  const leaveSession = useCallback(async () => {
    if (sessionId) {
      await axios.delete(`${base_url}/openvidu/api/sessions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ sessionId }),
      });
      setOV(null);
      setSession(null);
      setSessionId('');
      setSubscriber(null);
      setPublisher(null);
      setToken(null);
    }
  }, [sessionId]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (!session) return;

    const handleStreamDestroyed = (event: StreamEvent) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      } else if (
        publisher &&
        event.stream.streamId === publisher.stream.streamId
      ) {
        setPublisher(null);
      }
    };

    const handleStreamCreated = (event: StreamEvent) => {
      if (
        !subscriber &&
        event.stream.connection.connectionId !==
          publisher?.stream.connection.connectionId
      ) {
        const newSubscriber = session.subscribe(event.stream, '');
        setSubscriber(newSubscriber);
      }
    };

    session.on('streamDestroyed', handleStreamDestroyed);
    session.on('streamCreated', handleStreamCreated);

    return () => {
      session.off('streamDestroyed', handleStreamDestroyed);
      session.off('streamCreated', handleStreamCreated);
    };
  }, [session, token, publisher, subscriber]);

  const createSession = async (sessionId: string) => {
    try {
      const data = JSON.stringify({
        customSessionId: sessionId,
        mediaMode: 'ROUTED',
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
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        return sessionId;
      } else {
        console.error('세션 생성 실패:', error);
        throw error;
      }
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
        console.error('Axios 오류:', error.response?.data || error.message);
      } else {
        console.error('예상치 못한 오류:', error);
      }
      throw new Error('토큰 생성 실패.');
    }
  };

  const getToken = async (): Promise<string> => {
    if (token) return token;
    try {
      const sessionIds = await createSession(sessionId);
      const token = await createToken(sessionIds);
      setToken(token);
      return token;
    } catch (error) {
      throw new Error('토큰 받기 실패.');
    }
  };

  useEffect(() => {
    if (!session) return;
    if (token) return;
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
                .catch((error) => console.error('퍼블리싱 오류:', error));
            }
          })
          .catch((error) => console.error('세션 연결 오류:', error));
      })
      .catch((error) => console.error('토큰 받기 오류:', error));
  }, [session, OV, sessionId]);

  const startScreenShare = async () => {
    if (!token) {
      console.warn('Token not available for screen sharing.');
      return;
    }

    try {
      if (!session) return;
      session.disconnect();
      if (OV && session) {
        const publisher = OV.initPublisher(undefined, {
          videoSource: 'screen',
          audioSource: 'screen',
        });

        publisher.once('accessAllowed', () => {
          publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .addEventListener('ended', () => {});
          session.publish(publisher);
          setPublisher(publisher);
        });

        publisher.once('accessDenied', () => {
          console.warn('ScreenShare: Access Denied');
        });

        session.connect(token);
      }
    } catch (error) {
      console.error('Failed to start screen share:', error);
    }
  };

  return {
    session,
    publisher,
    subscriber,
    leaveSession,
    startScreenShare,
    joinSession,
    setSubscriber,
    setPublisher,
    OV,
  };
}
