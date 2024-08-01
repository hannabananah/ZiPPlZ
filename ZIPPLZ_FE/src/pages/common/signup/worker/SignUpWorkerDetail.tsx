import { useEffect, useState } from 'react';

import { Worker } from '@apis/member/MemberApi';
import Input from '@components/common/Input';
import RegistrationInput from '@components/signup/RegistrationInput';

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setWorker: React.Dispatch<React.SetStateAction<Worker>>;
  phrase: string;
}
export default function SignupWorkerDetail({
  setActive,
  setLink,
  setWorker,
  phrase,
}: Props) {
  const [registrationNumber, setRegistrationNumber] = useState<string>('');

  const [groupName, setGroupName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  function validateInfo() {
    if (address && groupName && registrationNumber.length === 12) {
      if (phrase === 'detail') setLink('/member/join/worker/3/region');
      else setLink('/member/join/worker/3/extraregion');
      return true;
    }
  }
  useEffect(() => {
    if (validateInfo()) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [registrationNumber, groupName, address]);
  useEffect(() => {
    setWorker((prev: Worker) => ({
      ...prev,
      businessNumber: registrationNumber,
    }));
  }, [registrationNumber]);
  return (
    <>
      <div className="relative flex flex-col w-full gap-4 p-4 bg-zp-white">
        <p className="text-xl font-bold">사업자등록번호</p>
        <RegistrationInput
          placeholder="000-00-00000"
          value={registrationNumber}
          onChange={setRegistrationNumber}
        />

        <p className="text-xl font-bold">소속업체명</p>

        <Input
          type="text"
          inputType="signup"
          placeholder="업체을 입력하세요"
          width="full"
          height={2}
          onChange={(e: React.ChangeEvent) => {
            setGroupName((e.target as HTMLInputElement).value);
            setWorker((prev: Worker) => ({
              ...prev,
              company: (e.target as HTMLInputElement).value,
            }));
          }}
          fontSize="xl"
          className="p-1"
          radius="none"
        />

        <p className="text-xl font-bold">소속업체 주소</p>

        <Input
          type="text"
          inputType="signup"
          placeholder="업체 주소를 입력하세요"
          width="full"
          height={2}
          onChange={(e: React.ChangeEvent) => {
            setAddress((e.target as HTMLInputElement).value);
            setWorker((prev: Worker) => ({
              ...prev,
              companyAddress: (e.target as HTMLInputElement).value,
            }));
          }}
          fontSize="xl"
          className="p-1"
          radius="none"
        />
      </div>
    </>
  );
}
