import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios, { AxiosError } from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  StreamEvent,
  Subscriber,
} from 'openvidu-browser';

const base_url = import.meta.env.VITE_APP_BASE_URL;
const token = import.meta.env.VITE_APP_AUTH_TOKEN;

export default function useOpenVidu() {
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession('');
    setSessionId('');
    setSubscriber(null);
    setPublisher(null);
    setRecordingId(null);
    navigate('/');
  }, [session, navigate]);

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
  };

  const Data = 'monkey';
  useEffect(() => {
    if (Data) {
      setSessionId(Data);
      joinSession();
    }
  }, [Data]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (session === '') return;

    const handleStreamDestroyed = (event: StreamEvent) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
        stopRecording();
      } else if (
        publisher &&
        event.stream.streamId === publisher.stream.streamId
      ) {
        stopRecording();
      }
    };

    session.on('streamDestroyed', handleStreamDestroyed);

    return () => {
      session.off('streamDestroyed', handleStreamDestroyed);
    };
  }, [subscriber, publisher, session]);

  useEffect(() => {
    if (session === '') return;

    const handleStreamCreated = (event: StreamEvent) => {
      const newSubscriber = session.subscribe(event.stream, '');
      setSubscriber(newSubscriber);
      startRecording();
    };

    session.on('streamCreated', handleStreamCreated);

    return () => {
      session.off('streamCreated', handleStreamCreated);
    };
  }, [session]);

  const startRecording = async () => {
    try {
      const response = await axios.post(
        `${base_url}/openvidu/api/sessions/recording`,
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Recording started:', response.data);
      setRecordingId(response.data.recordingId);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recordingId) throw new Error('No recording ID available');
      const response = await axios.post(
        `${base_url}/openvidu/api/sessions/recording/stop`,
        { recordingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Recording stopped:', response.data);
      setRecordingId(null);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  useEffect(() => {
    if (session === '') return;

    const createSession = async (sessionIds: string): Promise<string> => {
      try {
        const data = JSON.stringify({
          customSessionId: sessionIds,
          chatroomSerial: 1,
        });
        const response = await axios.post(
          `${base_url}/openvidu/api/sessions`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return (response.data as { id: string }).id;
      } catch (error) {
        const errorResponse = (error as AxiosError)?.response;

        if (errorResponse?.status === 409) {
          return sessionIds;
        }

        throw new Error('Failed to create session.');
      }
    };

    const createToken = async (sessionIds: string): Promise<string> => {
      try {
        const data = JSON.stringify({
          role: 'PUBLISHER',
          sessionId: sessionIds,
          // sessionId: 'monkey',
          chatroomSerial: 1,
        });
        const response = await axios.post(
          `${base_url}/openvidu/api/sessions/connections`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
          }
        } else {
          console.error('Unexpected error:', error);
        }
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
  }, [session, OV, sessionId]);

  return {
    session,
    publisher,
    subscriber,
    leaveSession,
    joinSession,
    setSubscriber,
    setPublisher,
    OV,
  };
}
