import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCheckPassword, setShowCheckPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  function validatePassword(password: string): boolean {
    if (!password) return true;
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    return passwordRegex.test(password);
  }
  const handleCickEye = function () {
    setShowPassword(!showPassword);
  };
  const handleCickCheckEye = function () {
    setShowCheckPassword(!showCheckPassword);
  };
  function validateEmail(email: string): boolean {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!email) return true;
    return regex.test(email);
  }
  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <p className="font-bodoni text-zp-3xl">Zip plz</p>
        <div className="text-center">
          <p className="text-zp-xl font-bold">
            완벽한 인테리어, 편리한 시공 스케줄링,
          </p>
          <p className="text-zp-xl font-bold">
            나만의 공간을 더욱 특별하게 만드는 단 하나의 플랫폼
          </p>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold"></p>
        <Input
          type="email"
          inputType="login"
          placeholder="이메일을 입력하세요"
          width="full"
          height={2}
          onChange={(e: React.ChangeEvent) => {
            setEmail((e.target as HTMLInputElement).value);
          }}
          fontSize="xl"
          radius="none"
        />
        {!validateEmail(email) && (
          <p className="text-zp-2xs text-zp-red">
            이메일 형식이 올바르지 않습니다.
          </p>
        )}
      </div>
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
      <Button
        buttonType="primary"
        width="full"
        height={4}
        children="로그인하기"
        fontSize="xl"
        radius="btn"
      />
      <div className="flex w-full justify-between px-[15%]">
        <p className="text-zp-md text-zp-gray  ml-[5%]">회원가입</p>
        <p className="text-zp-md text-zp-gray  ">아이디/비밀번호 찾기</p>
      </div>
      <div className="w-full h-[4rem] bg-zp-main-color">소셜로그인</div>
      <div className="w-full h-[4rem] bg-zp-main-color">소셜로그인</div>
    </>
  );
}
