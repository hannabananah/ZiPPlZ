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

export default function useOpenVidu() {
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  // const [recordingId, setRecordingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession('');
    setSessionId('');
    setSubscriber(null);
    setPublisher(null);
    // setRecordingId(null);
    // 이전 채팅방으로 돌아가기
    navigate(-1);
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

  // const startRecording = async () => {
  //   if (sessionId) {
  //     console.log('Starting recording with sessionId=========>', sessionId);
  //     try {
  //       const response = await axios.post(
  //         `${base_url}/openvidu/api/sessions/recording`,
  //         { sessionId },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       console.log('Recording started:', response.data);
  //       setRecordingId(response.data.recordingId);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error(
  //           'Axios error:',
  //           error.response?.data || error.message,
  //           error
  //         );
  //       } else {
  //         console.error('Unexpected error:', error);
  //       }
  //     }
  //   }
  // };

  // const stopRecording = async () => {
  //   if (recordingId) {
  //     try {
  //       const response = await axios.post(
  //         `${base_url}/openvidu/api/sessions/recording/stop`,
  //         { recordingId },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       console.log('Recording stopped:', response.data);
  //       setRecordingId(null);
  //     } catch (error) {
  //       console.error('Error stopping recording:', error);
  //     }
  //   } else {
  //     console.error('No recording ID available');
  //   }
  // };

  useEffect(() => {
    if (session === '') return;

    const handleStreamDestroyed = (event: StreamEvent) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
        // stopRecording();
      } else if (
        publisher &&
        event.stream.streamId === publisher.stream.streamId
      ) {
        setPublisher(null);
        // stopRecording();
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
        // startRecording();
      }
    };

    session.on('streamDestroyed', handleStreamDestroyed);
    session.on('streamCreated', handleStreamCreated);

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
          chatroomSerial: 1,
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
        return (response.data as { data: string }).data;
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
          chatroomSerial: 1,
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
