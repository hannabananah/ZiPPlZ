import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Input from '@components/common/Input';
import DateInput from '@components/signup/DateInput';
import PhoneInput from '@components/signup/PhoneInput';

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}
export default function SignupInfo({ setActive, setLink }: Props) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCheckPassword, setShowCheckPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleCickEye = function () {
    setShowPassword(!showPassword);
  };
  const handleCickCheckEye = function () {
    setShowCheckPassword(!showCheckPassword);
  };

  function validatePassword(password: string): boolean {
    if (!password) return true;
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    return passwordRegex.test(password);
  }

  function validateCheckPassword(
    password: string,
    checkPassword: string
  ): boolean {
    if (!password) return true;
    if (!checkPassword) return true;
    return password === checkPassword;
  }

  function validateEmail(email: string): boolean {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!email) return true;
    return regex.test(email);
  }

  function validateInfo() {
    if (
      name.length >= 3 &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateCheckPassword(password, checkPassword) &&
      birthDate.length === 10 &&
      phone.length === 13
    ) {
      setLink('/member/join/common/2/type');
      return true;
    }
  }
  useEffect(() => {
    if (validateInfo()) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [name, email, password, checkPassword, birthDate, phone]);

  return (
    <div className="relative flex flex-col bg-zp-white w-full p-4 gap-4 overflow-auto mb-[9rem]">
      <p className="text-xl font-bold">이름</p>

      <Input
        type="text"
        inputType="signup"
        placeholder="이름을 입력하세요"
        width="full"
        height={2}
        onChange={(e: React.ChangeEvent) => {
          setName((e.target as HTMLInputElement).value);
        }}
        fontSize="xl"
        className="p-1"
        radius="none"
      />
      <div>
        <p className="text-xl font-bold">이메일</p>
        <Input
          type="email"
          inputType="signup"
          placeholder="이메일을 입력하세요"
          width="full"
          height={2}
          onChange={(e: React.ChangeEvent) => {
            setEmail((e.target as HTMLInputElement).value);
          }}
          fontSize="xl"
          className="p-1"
          radius="none"
        />
        {!validateEmail(email) && (
          <p className="text-zp-2xs text-zp-red">
            이메일 형식이 올바르지 않습니다.
          </p>
        )}
      </div>
      <p className="text-xl font-bold">비밀번호</p>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          inputType={
            !password || validatePassword(password) ? 'signup' : 'error'
          }
          placeholder="비밀번호를 입력하세요"
          width="full"
          height={2}
          onChange={(e: React.ChangeEvent) => {
            setPassword((e.target as HTMLInputElement).value);
          }}
          fontSize="xl"
          radius="none"
        />
        {showPassword ? (
          <FaRegEyeSlash
            className="absolute top-[0.5rem] right-[1rem]"
            size={16}
            onClick={handleCickEye}
          />
        ) : (
          <FaRegEye
            className="absolute top-[0.5rem] right-[1rem]"
            size={16}
            onClick={handleCickEye}
          />
        )}
        {!validatePassword(password) && (
          <p className="text-zp-2xs text-zp-red">
            8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.
          </p>
        )}
      </div>
      <p className="text-xl font-bold">비밀번호 확인</p>
      <div className="relative">
        <Input
          type={showCheckPassword ? 'text' : 'password'}
          inputType="signup"
          placeholder="비밀번호를 한번 더 입력하세요"
          width="full"
          height={2}
          onChange={(e: React.ChangeEvent) => {
            setCheckPassword((e.target as HTMLInputElement).value);
          }}
          fontSize="xl"
          radius="none"
          className="p-1"
        />
        {showCheckPassword ? (
          <FaRegEyeSlash
            className="absolute top-[0.5rem] right-[1rem]"
            size={16}
            onClick={handleCickCheckEye}
          />
        ) : (
          <FaRegEye
            className="absolute top-[0.5rem] right-[1rem]"
            size={16}
            onClick={handleCickCheckEye}
          />
        )}
        {!validateCheckPassword(password, checkPassword) && (
          <p className="text-zp-2xs text-zp-red">비밀번호를 확인해주세요.</p>
        )}
      </div>

      <p className="text-xl font-bold">생년월일</p>
      <DateInput
        value={birthDate}
        onChange={setBirthDate}
        placeholder="YYYY/MM/DD"
      />
      <p className="text-xl font-bold">전화번호</p>
      <PhoneInput
        value={phone}
        onChange={setPhone}
        placeholder="010-0000-0000"
        inputType="signup"
        fontSize="xl"
        height={2}
        radius="none"
      />
    </div>
  );
}
