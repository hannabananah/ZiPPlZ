import { useState } from 'react';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';
import { ImPhoneHangUp } from 'react-icons/im';
import { MdChecklistRtl, MdOutlineCameraswitch } from 'react-icons/md';

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

  const handleExitLive = () => {
    leaveSession();
  };

  return (
    <div className="absolute flex w-10/12 p-2 bottom-3 justify-evenly rounded-zp-radius-big bg-zp-light-yellow">
      <button className="btn" onClick={handleMute}>
        {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
      </button>
      <button className="btn" onClick={handleHide}>
        {isHided ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
      </button>
      <button className="btn" onClick={handleSwitch}>
        <MdOutlineCameraswitch size={24} />
      </button>
      <button className="btn">
        <MdChecklistRtl size={28} />
      </button>
      <button className="btn bg-zp-red" onClick={handleExitLive}>
        <ImPhoneHangUp size={28} fill="#fff" />
      </button>
    </div>
  );
}
