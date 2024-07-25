import { useState } from 'react';
import { useParams } from 'react-router-dom';

import SignBottom from '@/components/signup/SignBottom';
import SignUpHead from '@/components/signup/SignUpHead';

import SignUpAgree from './SignUpAgree';
import SignUpInfo from './SignUpInfo';
import SignUpNickName from './SignUpNickName';
import SignUpSelectType from './SignUpSelectType';

export default function SignUp() {
  const { order, type, phrase } = useParams<{
    order: string;
    type: string;
    phrase: string;
  }>();
  const orderNumber: number = order ? parseInt(order) : 0;
  const [next, setNext] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  return (
    <div className="w-[600px] relative flex flex-col bg-zp-white  min-h-screen max-h-screen p-4 gap-4">
      <SignUpHead type={type} />
      {orderNumber === 1 && type === 'common' && phrase === 'info' && (
        <SignUpInfo setActive={setActive} setLink={setLink} />
      )}
      {orderNumber === 1 && type === 'common' && phrase === 'type' && (
        <SignUpSelectType setNext={setNext} setLink={setLink} />
      )}
      {orderNumber === 2 && phrase === 'nickname' && (
        <SignUpNickName setLink={setLink} setNext={setNext} />
      )}
      {phrase === 'agree' && (
        <SignUpAgree setLink={setLink} setNext={setNext} />
      )}
      <SignBottom
        order={orderNumber}
        phrase={phrase}
        active={active}
        next={next}
        link={link}
        setNext={setNext}
        setActive={setActive}
      />
    </div>
  );
}
