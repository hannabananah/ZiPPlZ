import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { requestLogin } from '@/apis/member/MemberApi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const GOOGLE_LOGIN_URL: string = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const handleClickEye = function () {
    setShowPassword(!showPassword);
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await requestLogin(email, password);
      console.log('data :', response.data);
      console.log('headers :', response.headers);
      console.log(response);
      const authorizationHeader = response.headers.authorization;
      console.log(authorizationHeader);
      if (authorizationHeader) {
        const token: string = authorizationHeader.split('  ')[1];
        console.log(token);
        Cookies.set('accesstoken', token, { expires: 1 });
        console.log('status :', response.status);

        if (response.status === 200) {
          navigate('/');
        } else {
          alert('로그인 실패');
        }
      } else {
        console.error('Authorization header is missing');
        alert('로그인 실패: 서버 응답에 문제가 있습니다.');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
      console.error('Login request failed:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  function validateEmail(email: string): boolean {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!email) return true;
    return regex.test(email);
  }
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="z-10 flex flex-col min-h-screen gap-6 px-4"
        style={{
          backgroundImage: "url('/src/assets/landing-cover1.svg')",
          backgroundSize: '130%',
          backgroundPosition: '50% top',
        }}
      >
        <div className="absolute inset-0 z-20 bg-zp-white bg-opacity-20"></div>
        <div className="flex flex-col items-center gap-6 mt-[25%] z-30">
          <p className="font-bodoni text-zp-3xl">Zip plz</p>
          <div className="text-center">
            <p className="font-bold text-zp-xl">
              완벽한 인테리어, 편리한 시공 스케줄링,
            </p>
            <p className="font-bold text-zp-xl">
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
            value={email}
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
            inputType="login"
            value={password}
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
              onClick={handleClickEye}
            />
          ) : (
            <FaRegEye
              className="absolute top-[0.5rem] right-[1rem]"
              size={16}
              onClick={handleClickEye}
            />
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
              console.log(email);
              console.log(password);
              login(email, password);

              setEmail('');
              setPassword('');
            }}
          />
        </div>
        <div className="flex w-full justify-between px-[15%] z-30">
          <p
            className="text-zp-md text-zp-gray  ml-[5%] cursor-pointer font-bold"
            onClick={() => {
              navigate('/member/join/common/1/agree');
            }}
          >
            회원가입
          </p>
          <p
            className="font-bold cursor-pointer text-zp-md text-zp-gray"
            onClick={() => {
              navigate('/member/find?type=id');
            }}
          >
            아이디/비밀번호 찾기
          </p>
        </div>
        <div className="absolute  left-0 bottom-[4rem] px-4 w-full flex flex-col gap-4 z-30">
          <Link to={GOOGLE_LOGIN_URL}>
            <div
              className="w-full h-[3rem] rounded-zp-radius-btn"
              onClick={() => {
                console.log(GOOGLE_LOGIN_URL);
              }}
              style={{
                backgroundImage: "url('/src/assets/login/GoogleLogin.svg')",
                backgroundRepeat: 'no-repeat',
                // backgroundSize: '30%',
                backgroundPosition: 'center center',
              }}
            />
          </Link>
          <div
            className="w-full h-[3rem] rounded-zp-radius-btn"
            style={{
              backgroundImage: "url('/src/assets/login/KakaoLogin.svg')",
              backgroundRepeat: 'no-repeat',
              // backgroundSize: '30%',
              backgroundPosition: 'center center',
            }}
          />
        </div>
      </div>
    </div>
  );
}
