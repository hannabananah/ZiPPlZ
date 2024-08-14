import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { requestLogin } from '@/apis/member/MemberApi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useLoginUserStore } from '@stores/loginUserStore';
import base64 from 'base-64';

export default function Login() {
  const { setIsLogin, setLoginUser } = useLoginUserStore();
  const GOOGLE_LOGIN_URL: string = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  const KAKAO_LOGIN_URL: string = import.meta.env.VITE_KAKAO_LOGIN_URL;
  const navigate = useNavigate();
  const [isNoUser, setIsNoUser] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const handleClickEye = function () {
    setShowPassword(!showPassword);
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await requestLogin(email, password);
      const authorizationHeader = response.headers.authorization;
      if (authorizationHeader) {
        let token: string = authorizationHeader.split(' ')[1];

        localStorage.setItem('token', token);
        let payload = token.substring(
          token.indexOf('.') + 1,
          token.lastIndexOf('.')
        );
        let dec = base64.decode(payload);
        let decodingInfoJson = JSON.parse(dec);
        setLoginUser({
          userSerial: decodingInfoJson.userSerial,
          email: decodingInfoJson.email,
          role: decodingInfoJson.role,
        });
        setIsLogin(true);

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
      setIsNoUser(true);
    }
  };
  useEffect(() => {
    if (isNoUser) setIsNoUser(false);
  }, [email]);
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
        <div className="z-50 flex items-end justify-end">
          <IoHomeOutline
            size={24}
            className="mt-4 cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
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
          {isNoUser && (
            <p className="text-zp-2xs text-zp-red">
              이메일 또는 비밀번호를 확인해주세요.
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
          <Link to={KAKAO_LOGIN_URL}>
            <div
              className="w-full h-[3rem] rounded-zp-radius-btn"
              style={{
                backgroundImage: "url('/src/assets/login/KakaoLogin.svg')",
                backgroundRepeat: 'no-repeat',
                // backgroundSize: '30%',
                backgroundPosition: 'center center',
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
