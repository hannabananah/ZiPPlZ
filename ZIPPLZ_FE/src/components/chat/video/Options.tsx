import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { ImPhoneHangUp } from 'react-icons/im';
import { MdCameraswitch, MdChecklistRtl } from 'react-icons/md';

interface OptionsProps {
  leaveSession: () => void;
}

export default function Options({ leaveSession }: OptionsProps) {
  const handleExitLive = () => {
    leaveSession();
  };

  return (
    <div className="flex w-10/12 p-2 justify-evenly rounded-zp-radius-big bg-zp-light-yellow">
      {/* 화면전환, 음소거, 계약서공유(시공업자 체크)->시공업자 화면공유 모달로 띄우기, 통화종료 */}
      {/* <button className="btn">
        <MdCameraswitch size={24} />
      </button> */}
      <button className="btn">
        <FaMicrophone size={24} />
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
