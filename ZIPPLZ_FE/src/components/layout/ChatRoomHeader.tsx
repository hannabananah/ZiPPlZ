import { CiMenuKebab } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { IoVideocamOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function ChatRoomHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-20 px-4 align-middle bg-zp-light-orange gap-x-6">
      <button onClick={() => navigate(-1)}>
        <IoIosArrowBack size={16} fill="#111" />
      </button>
      <img src="" alt="profile image" />
      <div className="flex flex-col flex-1">
        <div className="flex">
          <span>이름</span>
          <span>뱃지</span>
        </div>
        <div className="flex">
          <span>지역</span> | <span>분야</span>
        </div>
      </div>
      <div className="flex gap-6">
        <button>
          <IoVideocamOutline size={24} />
        </button>
        <button>
          <CiMenuKebab size={24} />
        </button>
      </div>
    </div>
  );
}
