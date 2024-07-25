import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Loading from '@components/common/Loading';

interface Props {
  order: number;
  active: boolean;
  next: boolean;
  phrase?: string;
  link: string;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const customModalStyles: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    maxWidth: '468px',
    minWidth: '350px',
    maxHeight: '300px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 1500,
  },
};
Modal.setAppElement('#root');
export default function SignBottom({
  order,
  active,
  next,
  phrase,
  link,
  setNext,
  setActive,
}: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = function () {
    setModalIsOpen(true);
  };
  const closeModal = function () {
    setModalIsOpen(false);
  };
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActive(false);
      alert('인증이 완료되었습니다.');
      setNext(true);
    }, 3000);
  };
  return (
    <>
      <div className="w-full flex flex-col gap-2 absolute bottom-[1rem] left-0 p-4">
        <div className="grid grid-cols-3 gap-0 w-full h-[0.5rem] bg-zp-light-beige">
          <div className="bg-zp-sub-color" />
          <div
            className={order > 1 ? 'bg-zp-sub-color' : 'bg-zp-light-beige'}
          />
          <div
            className={order > 2 ? 'bg-zp-sub-color' : 'bg-zp-light-beige'}
          />
        </div>
        {order === 1 && phrase === 'info' && (
          <Button
            buttonType={active ? 'second' : 'light'}
            radius="btn"
            width="full"
            height={3.75}
            children="인증"
            fontSize="2xl"
            disabled={!active}
            onClick={handleClick}
          />
        )}
        <Button
          buttonType={next ? 'second' : 'light'}
          radius="btn"
          width="full"
          height={3.75}
          children={order < 3 ? '다음' : '회원가입 완료'}
          fontSize="2xl"
          disabled={!next}
          onClick={() => {
            setNext(false);
            setActive(false);
            if (order < 3) navigate(link);
            else openModal();
          }}
        />
      </div>
      {isLoading && <Loading />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <p className="absolute top-[1rem] left-0 text-zp-2xl font-bold w-full text-center">
          회원가입 완료
        </p>
        <hr className="absolute top-[4rem] left-0 w-full border border-zp-sub-color" />
        <div className="w-full flex flex-col mt-[4rem] items-center gap-6">
          <div className="w-full flex flex-col items-center ">
            <p className="text-zp-xl font-bold text-center">
              회원가입이 완료되었습니다.
            </p>
            <p className="text-zp-xl font-bold text-center">
              로그인 페이지로 이동해주세요.
            </p>
          </div>
          <Button
            buttonType="second"
            children="로그인 하러가기"
            width={8}
            height={3}
            fontSize="xl"
            radius="btn"
            onClick={() => {
              navigate(link);
            }}
          />
        </div>
      </Modal>
    </>
  );
}
