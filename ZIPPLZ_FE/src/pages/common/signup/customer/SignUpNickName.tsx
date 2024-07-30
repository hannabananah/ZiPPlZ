import React, { useEffect, useState } from 'react';

import Input from '@components/common/Input';

interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}
export default function SignUpNickName({ setNext, setLink }: Props) {
  const [nickName, setNickName] = useState<string>('');
  setLink('/member/login');
  useEffect(() => {
    if (nickName) setNext(true);
    else setNext(false);
  });
  return (
    <>
      <p className="w-full font-bold text-zp-xl">닉네임</p>
      <Input
        inputType="signup"
        type="text"
        placeholder="닉네임을 입력하세요."
        fontSize="xl"
        width="full"
        height={2}
        radius="none"
        onChange={(e: React.ChangeEvent) => {
          setNickName((e.target as HTMLInputElement).value);
        }}
      />
    </>
  );
}
