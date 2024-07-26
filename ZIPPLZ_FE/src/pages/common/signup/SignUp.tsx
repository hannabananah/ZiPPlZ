import { useState } from 'react';
import { useParams } from 'react-router-dom';

import SignBottom from '@/components/signup/SignBottom';
import SignUpHead from '@/components/signup/SignUpHead';

import SignUpAgree from './common/SignUpAgree';
import SignUpInfo from './common/SignUpInfo';
import SignUpSelectType from './common/SignUpSelectType';
import SignUpNickName from './customer/SignUpNickName';
import SignUpWorkerDetail from './worker/SignUpWorkerDetail';
import SignUpWorkerRegion from './worker/SignUpWorkerRegion';

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
    <div className="w-full relative flex flex-col bg-zp-white  min-h-screen max-h-screen p-4 gap-4">
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
      {phrase === 'detail' && type === 'worker' && (
        <SignUpWorkerDetail setActive={setActive} setLink={setLink} />
      )}
      {phrase === 'region' && type === 'worker' && (
        <SignUpWorkerRegion setNext={setNext} setLink={setLink} />
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
