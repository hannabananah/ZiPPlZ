import React, { useEffect, useState } from 'react';

import {
  HammerandWrench,
  HammerandWrenchFilled,
  Telescope,
  TelescopeFilled,
} from '@/assets/svg/icons';

interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpSelectType({ setNext, setLink }: Props) {
  const [userType, setUserType] = useState<string>('');
  const [isUserHovered, setIsUserHovered] = useState<boolean>(false);
  const [isWorkerUserHovered, setIsWorkerHovered] = useState<boolean>(false);
  return (
    <>
      <p className="w-full text-zp-xl font-bold">회원 유형</p>
      <div className="w-full absolute top-1/4 left-0  flex justify-center  gap-4 px-4">
        <div
          className={`flex flex-col justify-center items-center border rounded-zp-radius-btn border-zp-main-color gap-4 p-10 cursor-pointer hover:bg-zp-sub-color ${userType === 'customer' ? 'bg-zp-sub-color' : ''}`}
          onMouseEnter={() => setIsUserHovered(true)}
          onMouseLeave={() => setIsUserHovered(false)}
          onClick={() => {
            setNext(true);
            setLink('/member/join/customer/2/nickname');
            setUserType('customer');
          }}
        >
          {isUserHovered || userType === 'customer' ? (
            <TelescopeFilled width={120} height={120} />
          ) : (
            <Telescope width={120} height={120} />
          )}
          <p className="text-zp-md text-zp-gray ">집을 꾸미고 싶어요!</p>
          <p className="text-zp-2xl font-bold">고객</p>
        </div>
        <div
          className={`flex flex-col justify-center items-center border rounded-zp-radius-btn border-zp-main-color gap-4 p-10 cursor-pointer hover:bg-zp-sub-color ${userType === 'worker' ? 'bg-zp-sub-color' : ''}`}
          onMouseLeave={() => setIsWorkerHovered(false)}
          onClick={() => {
            setNext(true);
            setLink('/member/join/worker/2/region');
            setUserType('worker');
          }}
        >
          {isWorkerUserHovered || userType === 'worker' ? (
            <HammerandWrenchFilled width={120} height={120} />
          ) : (
            <HammerandWrench width={120} height={120} />
          )}
          <p className="text-zp-md text-zp-gray ">고객을 찾고 싶어요!</p>
          <p className="text-zp-2xl font-bold">시공업자</p>
        </div>
      </div>
    </>
  );
}
