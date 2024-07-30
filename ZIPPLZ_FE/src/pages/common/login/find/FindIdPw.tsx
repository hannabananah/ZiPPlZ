import { FaArrowLeft } from 'react-icons/fa6';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import FindId from './FindId';
import FindPw from './FindPw';

export default function FindIdPw() {
  const navigate = useNavigate();
  const location = useLocation();

  // 쿼리 매개변수 파싱
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');

  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <FaArrowLeft size={16} onClick={() => navigate('/member/login')} />
      <p className="text-zp-3xl font-extrabold mt-6">FIND ID / PW</p>
      <div className="flex gap-5 mt-3">
        <NavLink
          to="?type=id"
          className={`p-1 ${
            type === 'id' ? 'border-b-8 border-zp-gray ' : ''
          } text-zp-xl font-extrabold cursor-pointer`}
        >
          아이디 찾기
        </NavLink>
        <NavLink
          to="?type=password"
          className={`p-1 ${
            type === 'password' ? 'border-b-8 border-zp-gray' : ''
          } text-zp-xl font-extrabold cursor-pointer`}
        >
          비밀번호 찾기
        </NavLink>
      </div>
      <div className="mt-6">
        {type === 'id' && <FindId />}
        {type === 'password' && <FindPw />}
      </div>
    </div>
  );
}
