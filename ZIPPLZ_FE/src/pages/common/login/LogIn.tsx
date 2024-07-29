import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function Login() {
  const navigate = useNavigate();
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
    <div className="w-full relative min-h-screen overflow-hidden">
      <div
        className="px-4 min-h-screen flex flex-col gap-6 z-10"
        style={{
          backgroundImage: "url('/src/assets/landing-cover1.svg')",
          backgroundSize: '130%',
          backgroundPosition: '50% top',
        }}
      >
        <div className="absolute inset-0 bg-zp-white bg-opacity-20 z-20"></div>
        <div className="flex flex-col items-center gap-6 mt-[25%] z-30">
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
        <div className="z-30">
          <p className="text-xl font-bold"></p>
          <Input
            type="email"
            inputType="login"
            placeholder="이메일"
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
        <div className="relative z-30">
          <Input
            type={showPassword ? 'text' : 'password'}
            inputType={
              !password || validatePassword(password) ? 'login' : 'error'
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
        <div className="z-30">
          <Button
            buttonType="primary"
            width="full"
            height={3}
            children="로그인하기"
            fontSize="xl"
            radius="btn"
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
        <div className="flex w-full justify-between px-[15%] z-30">
          <p
            className="text-zp-md text-zp-gray  ml-[5%] cursor-pointer font-bold"
            onClick={() => {
              navigate('/member/join/common/1/info');
            }}
          >
            회원가입
          </p>
          <p
            className="text-zp-md text-zp-gray cursor-pointer font-bold"
            onClick={() => {
              navigate('/member/find?type=id');
            }}
          >
            아이디/비밀번호 찾기
          </p>
        </div>
        <div className="absolute  left-0 bottom-[4rem] px-4 w-full flex flex-col gap-4 z-30">
          <div className="w-full h-[3rem] bg-zp-white rounded-zp-radius-btn">
            소셜로그인
          </div>
          <div className="w-full h-[3rem] bg-zp-yellow rounded-zp-radius-btn">
            소셜로그인
          </div>
        </div>
      </div>
    </div>
  );
}
