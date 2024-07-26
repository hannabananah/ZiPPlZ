import { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { ImPhoneHangUp } from 'react-icons/im';
import { MdChecklistRtl } from 'react-icons/md';

import { Publisher, Subscriber } from 'openvidu-browser';

interface OptionsProps {
  leaveSession: () => void;
  subscriber: Subscriber | null;
  publisher: Publisher;
  publishAudio: (enabled: boolean) => void;
  publishVideo: (enabled: boolean) => void;
}

export default function Options({ leaveSession, publisher }: OptionsProps) {
  const [isMuted, setIsMuted] = useState(false);

  const handleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    publisher.publishAudio(!newMuteState);
  };

  const handleExitLive = () => {
    leaveSession();
  };

  return (
    <div className="flex w-10/12 p-2 justify-evenly rounded-zp-radius-big bg-zp-light-yellow">
      <button className="btn" onClick={handleMute}>
        {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
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
