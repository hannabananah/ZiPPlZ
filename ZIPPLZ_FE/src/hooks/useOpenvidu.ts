import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useLoginUserStore } from '@stores/loginUserStore';
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
  const { chatroomSerial } = useParams();
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginUser } = useLoginUserStore();
  const email: string | undefined = loginUser?.email;

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
  };

  useEffect(() => {
    if (email) {
      // const derivedSessionId = email?.split('@')[0].trim();
      // console.log('Derived Session ID:', derivedSessionId);
      // setSessionId(derivedSessionId);

      setSessionId(String(chatroomSerial));
      joinSession();
    }
  }, [email]);

  const leaveSession = async () => {
    if (sessionId) {
      try {
        const data = JSON.stringify({
          sessionId: sessionId,
        });

        await axios.delete(`${base_url}/openvidu/api/sessions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          data,
        });
        setOV(null);
        setSession('');
        setSessionId('');
        setSubscriber(null);
        setPublisher(null);
        setRecordingId(null);
        navigate(-1);

        console.log('Session ended successfully');
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  const startRecording = async () => {
    if (sessionId) {
      console.log('Recording started');
      console.log(sessionId);
      try {
        const response = await axios.post(
          `${base_url}/openvidu/api/sessions/recording`,
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('response=======>', response);
        setRecordingId(response.data.recordingId);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error status:', error.response?.status);
          console.error('Error data:', error.response?.data);
          console.error('Error message:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } else {
      console.error('Session ID is missing');
    }
  };

  const stopRecording = async () => {
    console.log('recording', recordingId);
    if (recordingId) {
      try {
        const response = await axios.post(
          `${base_url}/openvidu/api/sessions/recording/stop`,
          { recordingId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setRecordingId(null);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    } else {
      console.error('No recording ID available');
    }
  };

  useEffect(() => {
    if (session === '') return;

    const handleStreamDestroyed = (event: StreamEvent) => {
      console.log('Stream destroyed:', event.stream.streamId);
      console.log('subscriber destroyed:', subscriber?.stream.streamId);
      console.log('publisher destroyed:', publisher?.stream.streamId);
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
        stopRecording();
      } else if (
        publisher &&
        event.stream.streamId === publisher.stream.streamId
      ) {
        setPublisher(null);
        stopRecording();
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
        startRecording();
      }
    };

    //     setIsSubscriberPresent(true);
    //     checkAndStartRecording();
    //     console.log('subscriber있어?', subscriber);
    //     console.log('publisher있어?', publisher);
    //   } else if (!publisher) {
    //     console.log('==========================');
    //     const newPublisher = session.publish(event.stream);
    //     setPublisher(newPublisher);
    //     // checkAndStartRecording();
    //     console.log('subscriber있어?', subscriber);
    //     console.log('publisher있어?', publisher);
    //   }
    // };

    session.on('streamDestroyed', handleStreamDestroyed);
    session.on('streamCreated', handleStreamCreated);
    console.log('subscriber있어?', subscriber);
    console.log('publisher있어?', publisher);

    return () => {
      session.off('streamDestroyed', handleStreamDestroyed);
      session.off('streamCreated', handleStreamCreated);
    };
  }, [session, publisher, subscriber]);

  useEffect(() => {
    if (session === '') return;

    const createSession = async (sessionIds: string): Promise<string> => {
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
        throw new Error('Failed to create session.');
      }
    };

    const createToken = async (sessionIds: string): Promise<string> => {
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
        const token = await createToken(sessionIds);
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
