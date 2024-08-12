import { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

interface ErrorState {
  current: boolean;
  new: boolean;
  confirm: boolean;
  emptyFields: boolean;
}

export default function MyPasswordModify() {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate(-1);
  };

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    current: false,
    new: false,
    confirm: false,
    emptyFields: false,
  });
  const existingPassword = '1234'; // 기존 비밀번호 설정

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    setError({
      current: false,
      new: false,
      confirm: false,
      emptyFields: false,
    });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError((prev) => ({
        ...prev,
        emptyFields: true,
      }));
    } else {
      if (currentPassword !== existingPassword) {
        setError((prev) => ({
          ...prev,
          current: true,
        }));
      }

      if (newPassword !== confirmPassword) {
        setError((prev) => ({
          ...prev,
          new: true,
          confirm: true,
        }));
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          {/* 뒤로가기 버튼 + "마이페이지" 글자 */}
          <div className="mt-12 h-12 flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                size={20} // 아이콘 크기 조정
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-2xl font-bold text-center">
              비밀번호 변경
            </div>
          </div>

          <div className="mt-6 font-bold text-zp-xl">기존 비밀번호</div>
          <div className="relative w-full">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요."
              className="w-full px-2 mt-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border-none focus:outline-none"
              value={currentPassword}
              onChange={handlePasswordChange}
            />
            {showCurrentPassword ? (
              <PiEyeLight
                className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowCurrentPassword(false)}
              />
            ) : (
              <PiEyeSlash
                className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowCurrentPassword(true)}
              />
            )}
          </div>
          <hr
            className={`mt-2 w-full ${
              error.current && currentPassword
                ? 'border-zp-red'
                : 'border-zp-light-gray'
            }`}
          />
          {error.current && currentPassword && (
            <div className="mt-2 font-bold text-zp-xs text-zp-red">
              현재 비밀번호와 다릅니다. 다시 입력해주세요
            </div>
          )}
          {error.emptyFields && !currentPassword && (
            <div className="mt-2 font-bold text-zp-xs text-zp-red">
              값이 입력되지 않았습니다. 입력해주세요
            </div>
          )}

          <div className="mt-6 font-bold text-zp-xl">새 비밀번호</div>
          <div className="relative w-full">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="새 비밀번호를 입력하세요."
              className="w-full px-2 mt-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border-none focus:outline-none"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            {showNewPassword ? (
              <PiEyeLight
                className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(false)}
              />
            ) : (
              <PiEyeSlash
                className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>
          <hr
            className={`mt-2 w-full ${
              (error.new || error.confirm) && newPassword && confirmPassword
                ? 'border-zp-red'
                : 'border-zp-light-gray'
            }`}
          />
          {error.new && newPassword && (
            <div className="mt-2 font-bold text-zp-xs text-zp-red">
              입력한 비밀번호가 서로 다릅니다. 변경할 Password를 다시
              확인해주세요
            </div>
          )}
          {error.emptyFields && !newPassword && (
            <div className="mt-2 font-bold text-zp-xs text-zp-red">
              값이 입력되지 않았습니다. 입력해주세요
            </div>
          )}

          <div className="mt-6 font-bold text-zp-xl">새 비밀번호 확인</div>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="새 비밀번호를 다시 입력하세요."
              className="w-full px-2 mt-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border-none focus:outline-none"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {showConfirmPassword ? (
              <PiEyeLight
                className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <PiEyeSlash
                className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>
          <hr
            className={`mt-2 w-full ${
              error.confirm && confirmPassword
                ? 'border-zp-red'
                : 'border-zp-light-gray'
            }`}
          />
          {error.confirm && confirmPassword && (
            <div className="mt-2 font-bold text-zp-xs text-zp-red">
              입력한 비밀번호가 서로 다릅니다. 변경할 Password를 다시
              확인해주세요
            </div>
          )}
          {error.emptyFields && !confirmPassword && (
            <div className="mt-2 font-bold text-zp-xs text-zp-red">
              값이 입력되지 않았습니다. 입력해주세요
            </div>
          )}

          <button
            className="w-full h-10 bg-zp-sub-color rounded-zp-radius-btn font-bold text-zp-xl flex justify-center items-center mt-6"
            onClick={handleSubmit}
          >
            변경
          </button>
        </div>
      </div>
    </>
  );
}
