import { useEffect, useState } from 'react';

import Input from '@/components/common/Input';
import RegistrationInput from '@/components/signup/RegistrationInput';

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}
export default function SignupInfo({ setActive, setLink }: Props) {
  const [registrationNumber, setRegistrationNumber] = useState<string>('');
  const [career, setCareer] = useState<number>(0);
  const [groupName, setGroupName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  function validateInfo() {
    if (address && groupName && registrationNumber.length === 12) {
      setLink('/member/join/worker/2/region');
      return true;
    }
  }
  useEffect(() => {
    if (validateInfo()) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [registrationNumber, career, groupName, address]);

  return (
    <>
      <div className="relative flex flex-col bg-zp-white w-full p-4 gap-4">
        <p className="text-xl font-bold">사업자등록번호</p>
        <RegistrationInput
          placeholder="000-00-00000"
          value={registrationNumber}
          onChange={setRegistrationNumber}
        />

        <p className="text-xl font-bold">경력</p>

        <Input
          type="number"
          inputType="signup"
          placeholder="00"
          width={3}
          height={2}
          onChange={(e: React.ChangeEvent) => {
            setCareer(parseInt((e.target as HTMLInputElement).value));
          }}
          fontSize="xl"
          className="p-1"
          radius="none"
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
          }}
          fontSize="xl"
          className="p-1"
          radius="none"
        />
      </div>
    </>
  );
}
