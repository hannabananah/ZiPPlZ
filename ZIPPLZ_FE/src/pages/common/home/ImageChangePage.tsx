import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLoginUserStore } from '@/stores/loginUserStore';

import ChangeTab from './ChangeTab';
import WatchTab from './WatchTab';

export default function ImageChangePage() {
  const { loginUser } = useLoginUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab') || 'change';
  const handleClick = (newTab: string) => {
    if (loginUser) {
      navigate(`/image-change/${loginUser.userSerial}?tab=${newTab}`);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen mt-[3.5rem] gap-4 px-6">
      <div className="flex items-center justify-center w-full gap-4">
        <p
          className={`w-[5rem] h-[2rem] p-1 text-center text-zp-md font-bold cursor-pointer ${
            tab === 'change' ? 'border-b-4 border-zp-main-color' : ' '
          }`}
          onClick={() => handleClick('change')}
        >
          변환하기
        </p>
        <p
          className={`w-[5rem] h-[2rem] p-1 text-center text-zp-md font-bold cursor-pointer ${
            tab === 'watch' ? 'border-b-4 border-zp-main-color' : ''
          }`}
          onClick={() => handleClick('watch')}
        >
          사진보기
        </p>
      </div>
      {tab === 'change' ? <ChangeTab /> : <WatchTab />}
    </div>
  );
}
