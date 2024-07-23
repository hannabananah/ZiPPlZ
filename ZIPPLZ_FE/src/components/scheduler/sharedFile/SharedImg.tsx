import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FiPlusCircle } from 'react-icons/fi';
import { LuMaximize2, LuMinimize2 } from 'react-icons/lu';
import Modal from 'react-modal';

import { ImageDragIcon } from '@/assets/svg/icons';
import Button from '@/components/common/Button';

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: '10',
  },
  content: {
    width: '29.25rem',
    height: '22.5rem',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
};
Modal.setAppElement('#root');

export default function SharedImg() {
  const isNull: boolean = false;
  const items = Array.from({ length: 20 }, (_, index) => index + 1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = function () {
    setModalIsOpen(true);
  };
  const closeModal = function () {
    setModalIsOpen(false);
  };
  return (
    <div
      className="relative flex flex-col bg-zp-white gap-1 justify-center items-center rounded-zp-radius-big"
      style={{ width: '21rem', height: '7rem' }}
    >
      {isNull ? (
        <>
          <ImageDragIcon width={48} height={48} />
          <p className="text-zp-xs text-zp-light-gray">
            공유할 이미지 가져오기
          </p>
          <Button
            buttonType="normal"
            children="이미지 가져오기"
            width={8}
            height={1.5}
            fontSize="xs"
            radius="btn"
          />
        </>
      ) : (
        <>
          <LuMaximize2
            className="absolute top-[1rem] right-[1rem] cursor-pointer"
            size={16}
            onClick={openModal}
          />
          <div className="flex items-center gap-4">
            <div
              className="bg-zp-black"
              style={{ width: '3rem', height: '3rem' }}
            >
              이미지
            </div>
            <div
              className="bg-zp-black"
              style={{ width: '3rem', height: '3rem' }}
            >
              이미지
            </div>
            <div
              className="bg-zp-black"
              style={{ width: '3rem', height: '3rem' }}
            >
              이미지
            </div>
            <FiPlusCircle
              className="cursor-pointer"
              size={32}
              onClick={() => alert('이미지추가')}
            />
          </div>
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <LuMinimize2
          className="absolute top-[1rem] right-[1rem] cursor-pointer"
          size={16}
          onClick={closeModal}
        />
        <hr className="absolute top-[3rem] w-full border border-zp-sub-color" />
        <div className="w-full mt-[4rem] px-[1rem] overflow-auto">
          <div className="grid grid-cols-3 gap-[1rem]">
            {items.map((item) => (
              <div className="w-[6rem] h-[6rem] border" key={item} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
