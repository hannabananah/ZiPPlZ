import { useEffect } from 'react';

import { useUserStore } from '@stores/userStore';
import { useVideoStore } from '@stores/videoStore';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

const OPENVIDU_SERVER_URL = `http://${window.location.hostname}:4443`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

export function useOpenVidu() {
  const {
    session,
    setSession,
    setPublisher,
    setSubscriber,
    setOV,
    reset,
    publisher,
    subscriber,
  } = useVideoStore();
  const { user } = useUserStore();

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();
    setOV(OV);
    setSession(session);

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
        console.error('Failed to create session:', error);
        throw new Error('Failed to create session.');
      }
    };

    const createToken = async (sessionId: string): Promise<string> => {
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
        return (response.data as { token: string }).token;
      } catch (error) {
        console.error('Failed to create token:', error);
        throw new Error('Failed to create token.');
      }
    };

    const joinSession = async () => {
      if (!user) {
        console.error('User is not defined');
        return;
      }

      try {
        const sessionId = await createSession(user.userSerial.toString());
        const token = await createToken(sessionId);
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
      } catch (error) {
        console.error('Failed to join session:', error);
      }
    };

    joinSession();

    return () => {
      if (session) {
        session.disconnect();
      }
      reset();
    };
  }, [setSession, setPublisher, setSubscriber, setOV, reset, user, subscriber]);

  return { session, publisher, subscriber };
}
