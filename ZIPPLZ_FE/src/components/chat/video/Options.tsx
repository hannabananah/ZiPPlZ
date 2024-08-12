import { useEffect, useState } from 'react';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';
import { ImPhoneHangUp } from 'react-icons/im';
import { MdChecklistRtl, MdOutlineCameraswitch } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import Contract from '@components/chat/Contract';
import FullModal from '@components/common/FullModal';
import axios from 'axios';
import {
  Session as OVSession,
  OpenVidu,
  Publisher,
  Subscriber,
} from 'openvidu-browser';

interface OptionsProps {
  leaveSession: () => void;
  subscriber: Subscriber | null;
  publisher: Publisher;
  session: OVSession | '';
  OV: OpenVidu | null;
  setPublisher: (publisher: Publisher) => void;
  publishAudio: (enabled: boolean) => void;
  publishVideo: (enabled: boolean) => void;
}

const base_url = import.meta.env.VITE_APP_BASE_URL;

export default function Options({
  leaveSession,
  publisher,
  session,
  OV,
  setPublisher,
  publishAudio,
  publishVideo,
}: OptionsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isHided, setIsHided] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [name, setName] = useState('');
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const { chatroomSerial } = useParams<{
    chatroomSerial?: string | undefined;
  }>();

  const handleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    publishAudio(!newMuteState);
  };

  const handleHide = () => {
    const newHideState = !isHided;
    setIsHided(newHideState);
    publishVideo(!newHideState);
  };

  const getOtherUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const url = `${base_url}chatroom/${chatroomSerial}`;

      const response = await axios.get(url, { headers });

      if (response.status === 200 && response.data) {
        return response.data.data;
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to get other user name: ${errorMessage}`);
    }
  };

  const handleSwitch = async () => {
    console.log('카메라 전환');
    console.log('session 확인:', session);
    console.log('OV instance 확인:', OV);

    if (OV && session) {
      try {
        const devices = await OV.getDevices();

        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );

        if (videoDevices.length > 1) {
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: isFrontCamera
              ? videoDevices[1].deviceId
              : videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: isFrontCamera,
          });

          console.log('화면공유 중지');
          await session.unpublish(publisher);

          setPublisher(newPublisher);
          await session.publish(newPublisher);

          setIsFrontCamera(!isFrontCamera);
        } else {
          console.warn('캠을 전환할 기기가 없습니다.');
        }
      } catch (error) {
        console.error('캠을 전환할 수 없습니다.:', error);
      }
    } else {
      console.warn('세션이나 OpenVidu를 사용할 수 없습니다.');
    }
  };

  const closeContractModal = () => {
    setIsContractModalOpen(false);
  };

  const handleExitLive = () => {
    leaveSession();
  };

  const handleSharingContract = () => {
    setIsContractModalOpen(true);
  };

  useEffect(() => {
    const getName = async () => {
      try {
        const userName = await getOtherUserName();
        setName(userName);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };

    getName();
  }, [chatroomSerial]);

  return (
    <div className="absolute flex w-10/12 p-2 bg-opacity-50 bottom-3 justify-evenly rounded-zp-radius-big bg-zp-light-yellow">
      <button className="btn" onClick={handleMute}>
        {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
      </button>
      <button className="btn" onClick={handleHide}>
        {isHided ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
      </button>
      <button className="btn" onClick={handleSwitch}>
        <MdOutlineCameraswitch size={24} />
      </button>
      <button className="btn" onClick={handleSharingContract}>
        <MdChecklistRtl size={28} />
      </button>
      <button className="btn bg-zp-red" onClick={handleExitLive}>
        <ImPhoneHangUp size={28} fill="#fff" />
      </button>
      <FullModal
        isOpen={isContractModalOpen}
        onRequestClose={closeContractModal}
        height="65%"
        maxWidth="400px"
      >
        <Contract closeContractModal={closeContractModal} name={name} />
      </FullModal>
    </div>
  );
}
