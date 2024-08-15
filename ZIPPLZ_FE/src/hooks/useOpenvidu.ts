import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
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
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  // const [recordingId, setRecordingId] = useState<string | null>(null);
  // const [participants, setParticipants] = useState<number>(0);
  // const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

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

  // const stopRecording = async () => {
  //   if (recordingId && participants < 2) {
  //     try {
  //       await axios.post(
  //         `${base_url}/openvidu/api/sessions/recording/stop`,
  //         { recordingId },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       console.log('녹화가 성공적으로 중지되었습니다');
  //       setRecordingId(null);
  //     } catch (error) {
  //       console.error('녹화 중지 오류:', error);
  //     }
  //   } else {
  //     console.error('녹화 ID가 없거나 참여자가 2명 이상입니다');
  //   }
  // };

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
      // setRecordingId(null);
      // setParticipants(0);
      // navigate(`/chatrooms/${chatroomSerial}`);
      console.log('세션이 성공적으로 종료되었습니다');
    }
  }, [sessionId, navigate, chatroomSerial]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  // const startRecording = async () => {
  //   if (!sessionId) {
  //     console.error('세션 ID가 없습니다');
  //     return;
  //   }

  //   if (participants < 2) {
  //     console.error('녹화를 시작하기에 충분한 참여자가 없습니다');
  //     return;
  //   }

  //   if (publisher && publisher.stream) {
  //     try {
  //       console.log('녹화 시작 시도...');
  //       const response = await axios.post(
  //         `${base_url}/openvidu/api/sessions/recording`,
  //         JSON.stringify({ sessionId }),
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //             'Content-Type': 'application/json',
  //           },
  //           // timeout: 60000,
  //         }
  //       );
  //       setRecordingId(response.data.recordingId);
  //       console.log('녹화가 성공적으로 시작되었습니다');
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error('오류 상태:', error.response?.status);
  //         console.error('오류 데이터:', error.response?.data);
  //         console.error('오류 메시지:', error.message);
  //         if (error.response?.status === 409) {
  //           console.log(
  //             '녹화 요청 충돌 발생. 세션이 이미 녹화 중이거나 세션 ID가 올바르지 않을 수 있습니다.'
  //           );
  //         } else {
  //           console.error(
  //             '기타 Axios 오류:',
  //             error.response?.data || error.message
  //           );
  //         }
  //       } else {
  //         console.error('예상치 못한 오류:', error);
  //       }
  //     }
  //   } else {
  //     console.error('퍼블리셔 또는 퍼블리셔 스트림이 없습니다');
  //   }
  // };

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
  }, [session, publisher, subscriber]);
  useEffect(() => {
    if (!session) return;

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
          console.log('세션이 이미 존재합니다. 기존 세션을 사용합니다.');
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
      try {
        const sessionIds = await createSession(sessionId);
        const token = await createToken(sessionIds);
        console.log('토큰을 성공적으로 받았습니다');
        return token;
      } catch (error) {
        throw new Error('토큰 받기 실패.');
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
                .catch((error) => console.error('퍼블리싱 오류:', error));
            }
          })
          .catch((error) => console.error('세션 연결 오류:', error));
      })
      .catch((error) => console.error('토큰 받기 오류:', error));
  }, [session, OV, sessionId]);

  useEffect(() => {
    const getDetailSession = async () => {
      if (sessionId) {
        try {
          const response = await axios.post(
            `${base_url}/openvidu/api/sessions/info`,
            JSON.stringify({ sessionId }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(response); //임시로 추가해놓음
          // const participantsCount = response.data.data.connections.length;
          // setParticipants(participantsCount);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('오류 상태:', error.response?.status);
            console.error('오류 데이터:', error.response?.data);
          } else {
            console.error('예상치 못한 오류:', error);
          }
        }
      } else {
        console.error('세션 ID가 없습니다');
      }
    };

    getDetailSession();
  }, [sessionId]);

  // const startScreenShare = async () => {
  //   try {
  //     const token = await getToken();
  //     if (OV && session) {
  //       const publisher = OV.initPublisher(undefined, {
  //         videoSource: 'screen',
  //         publishAudio: false,
  //         publishVideo: true,
  //       });

  //       publisher.once('accessAllowed', () => {
  //         publisher.stream
  //           .getMediaStream()
  //           .getVideoTracks()[0]
  //           .addEventListener('ended', () => {
  //             console.log('User pressed the "Stop sharing" button');
  //           });
  //         session.publish(publisher);
  //       });

  //       publisher.once('accessDenied', () => {
  //         console.warn('ScreenShare: Access Denied');
  //       });

  //       await session.connect(token);
  //       session.publish(publisher);
  //     }
  //   } catch (error) {
  //     console.error('Failed to start screen share:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (participants >= 2 && !isRecording && publisher) {
  //     startRecording();
  //     setIsRecording(true);
  //   } else if (participants < 2 && isRecording) {
  //     stopRecording();
  //     setIsRecording(false);
  //   }
  // }, [participants, publisher, isRecording, startRecording, stopRecording]);

  return {
    session,
    publisher,
    subscriber,
    leaveSession,
    // startScreenShare,
    joinSession,
    setSubscriber,
    setPublisher,
    OV,
  };
}
