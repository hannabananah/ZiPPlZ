import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios, { AxiosError } from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  Subscriber,
} from 'openvidu-browser';

const OPENVIDU_SERVER_URL = `http://${window.location.hostname}:4443`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

// 예를 들어, sampleUser의 userSerial을 사용하여 sessionId를 생성합니다.
const sampleUser = { userSerial: 1 };
const sessionId = `chat_${sampleUser.userSerial}_${new Date().getTime()}`;

export function useOpenVidu() {
  const [session, setSession] = useState<OVSession | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const navigate = useNavigate();

  const leaveSession = useCallback(() => {
    console.log('Leaving session');
    if (session) {
      session.disconnect();
    }
    setOV(null);
    setSession(null);
    setSubscriber(null);
    setPublisher(null);
    navigate('/');
  }, [session, navigate]);

  useEffect(() => {
    console.log('Adding beforeunload event listener');
    window.addEventListener('beforeunload', leaveSession);
    return () => {
      console.log('Removing beforeunload event listener');
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  const createSession = async (): Promise<string> => {
    console.log('Creating session');
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
      console.log('Session created', response.data);
      return response.data.id;
    } catch (error) {
      const errorResponse = (error as AxiosError)?.response;
      console.error('Failed to create session:', errorResponse);
      if (errorResponse?.status === 409) {
        return sessionId;
      }
      throw new Error('Failed to create session.');
    }
  };

  const createToken = async (sessionId: string): Promise<string> => {
    console.log('Creating token for sessionId:', sessionId);
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Token created', response.data);
      return response.data.token;
    } catch (error) {
      console.error('Failed to create token:', error);
      throw new Error('Failed to create token.');
    }
  };

  const getToken = async (): Promise<string> => {
    console.log('Getting token');
    try {
      const sessionId = await createSession();
      const token = await createToken(sessionId);
      return token;
    } catch (error) {
      console.error('Failed to get token:', error);
      throw new Error('Failed to get token.');
    }
  };

  const joinSession = useCallback(async () => {
    console.log('Joining session');
    if (!session || !OV) {
      console.warn('Session or OpenVidu instance is missing');
      return;
    }
    try {
      const token = await getToken();
      await session.connect(token);
      console.log('Session connected');

      const publisherInstance = OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        mirror: true,
      });

      setPublisher(publisherInstance);
      await session.publish(publisherInstance);
      console.log('Publisher published');
    } catch (error) {
      console.error('Failed to join session:', error);
    }
  }, [session, OV]);

  useEffect(() => {
    if (session) {
      session.on('streamCreated', (event) => {
        console.log('Stream created event:', event);

        if (!subscriber) {
          const newSubscriber = session.subscribe(event.stream, '');
          console.log('Subscriber created:', newSubscriber);

          // 비디오 요소 생성 및 추가
          const videoElement = newSubscriber.createVideoElement();
          if (videoElement) {
            console.log(
              'Video element created for new subscriber:',
              videoElement
            );
            document.body.appendChild(videoElement); // 적절한 위치에 추가합니다.
          } else {
            console.error('Failed to create video element for new subscriber');
          }

          setSubscriber(newSubscriber);
        } else {
          console.log('Subscriber already exists');
        }
      });

      session.on('streamDestroyed', (event) => {
        console.log('Stream destroyed event:', event);
        if (
          subscriber &&
          event.stream.streamId === subscriber.stream.streamId
        ) {
          setSubscriber(null);
          console.log('Subscriber removed');
        }
      });
    }
    return () => {
      if (session) {
        console.log('Disconnecting session');
        session.disconnect();
      }
    };
  }, [session, subscriber]);

  useEffect(() => {
    const OVs = new OpenVidu();
    const sessionInstance = OVs.initSession();
    setOV(OVs);
    setSession(sessionInstance);

    return () => {
      if (sessionInstance) {
        console.log('Disconnecting session');
        sessionInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (session && OV) {
      joinSession();
    }
  }, [session, OV, joinSession]);

  return {
    publisher,
    subscriber,
    leaveSession,
  };
}

export default useOpenVidu;
