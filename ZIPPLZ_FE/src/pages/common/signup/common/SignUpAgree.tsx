import React, { useEffect, useState } from 'react';

import Checkbox from '@components/common/Checkbox';

interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  phrase: string;
}

export default function SignUpAgree({ setNext, setLink, phrase }: Props) {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [privateAgree, setPrivateAgree] = useState<boolean>(false);
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [marketingAgree, setMarketingAgree] = useState<boolean>(false);

  const handleAllChange = () => {
    const allChecked = !(privateAgree && serviceAgree && marketingAgree);
    setPrivateAgree(allChecked);
    setServiceAgree(allChecked);
    setMarketingAgree(allChecked);
  };

  const handlePrivateChange = () => {
    setPrivateAgree((prev) => !prev);
  };

  const handleServiceChange = () => {
    setServiceAgree((prev) => !prev);
  };

  const handleMarketingChange = () => {
    setMarketingAgree((prev) => !prev);
  };

  useEffect(() => {
    if (serviceAgree && privateAgree) {
      setNext(true);
      if (phrase === 'extra-agree') setLink('/member/join/common/2/extrainfo');
      else setLink('/member/join/common/2/info');
    } else setNext(false);
  }, [privateAgree, serviceAgree, marketingAgree]);

  return (
    <div className="overflow-y-auto max-h-screen p-4 overflow-auto mb-[6rem]">
      <pre className="font-extrabold text-zp-3xl">
        서비스 이용을 위한{'\n'}동의 안내
      </pre>

      <pre className="mt-4 font-extrabold text-zp-xl text-wrap">
        서비스 이용에 꼭 필요한 사항입니다.{'\n'}정책 및 약관을 클릭해 모든
        내용을 확인해주세요.
      </pre>

      <div className="flex flex-col items-center justify-center w-full gap-4 mt-4">
        {showDetail && <div className="w-full h-[300px] bg-zp-gray" />}
        <p
          className="cursor-pointer text-zp-lg text-zp-light-gray"
          onClick={() => setShowDetail(!showDetail)}
        >
          {showDetail ? '접기' : '펼치기'}
        </p>
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="font-bold text-zp-2xl">전체 동의</p>
        <Checkbox
          checked={privateAgree && serviceAgree && marketingAgree}
          onChange={handleAllChange}
        />
      </div>

      <hr className="my-4 text-zp-light-gray" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <p className="font-bold text-zp-xl">[필수] 개인정보 처리방침</p>
          <Checkbox checked={privateAgree} onChange={handlePrivateChange} />
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="font-bold text-zp-xl">[필수] Zip-plz 서비스 이용약관</p>
          <Checkbox checked={serviceAgree} onChange={handleServiceChange} />
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="font-bold text-zp-xl">[선택] 마케팅 정보 수신 동의</p>
          <Checkbox checked={marketingAgree} onChange={handleMarketingChange} />
        </div>
      </div>
    </div>
  );
}
