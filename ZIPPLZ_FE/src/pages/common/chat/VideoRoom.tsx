import React, { useCallback, useEffect, useState } from 'react';

import JoinVideoForm from '@components/chat/video/JoinVideoForm';
import Session from '@components/chat/video/Session';
import axios, { AxiosError } from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  Subscriber,
} from 'openvidu-browser';

export default function VideoRoom() {
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);

  const OPENVIDU_SERVER_URL = `http://${window.location.hostname}:4443`;
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();
    setOV(null);
    setSession('');
    setSessionId('');
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  const sessionIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionId(event.target.value);
  };

  useEffect(() => {
    if (session === '') return;

    session.on('streamDestroyed', (event) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    });
  }, [subscriber, session]);

  useEffect(() => {
    if (session === '') return;

    session.on('streamCreated', (event) => {
      const subscribers = session.subscribe(event.stream, '');
      setSubscriber(subscribers);
    });

    const createSession = async (sessionIds: string): Promise<string> => {
      try {
        const data = JSON.stringify({ customSessionId: sessionIds });
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
      } catch (err) {
        const errResponse = (err as AxiosError)?.response;
        if (errResponse?.status === 409) {
          return sessionIds;
        }
        return '';
      }
    };

    const createToken = (sessionIds: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const data = {};
        axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            resolve((res.data as { token: string }).token);
          })
          .catch((err) => reject(err));
      });
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

    getToken()
      .then((token) => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publishers = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                mirror: true,
              });

              setPublisher(publishers);
              session
                .publish(publishers)
                .then(() => {})
                .catch(() => {});
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, sessionId, OPENVIDU_SERVER_URL]);

  return (
    <div>
      <h1>진행화면</h1>
      <>
        {!session && (
          <JoinVideoForm
            joinSession={joinSession}
            sessionId={sessionId}
            sessionIdChangeHandler={sessionIdChangeHandler}
          />
        )}
        {session && (
          <div>
            <Session
              publisher={publisher as Publisher}
              subscriber={subscriber as Subscriber}
            />
            <button onClick={leaveSession}>나가기</button>
          </div>
        )}
      </>
    </div>
  );
}
