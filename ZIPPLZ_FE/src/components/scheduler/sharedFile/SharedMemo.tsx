import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { LuMaximize2, LuMinimize2 } from 'react-icons/lu';
import { MdOutlineCancel } from 'react-icons/md';
import { VscKebabVertical } from 'react-icons/vsc';
import Modal from 'react-modal';

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
export default function SharedMemo() {
  const isNull: boolean = false;
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
  const items: string[] = [
    '담배 피지 말아주세요ㅠㅠ',
    '뒷정리 깔끔하게 부탁드립니다!',
    '세면대가 깨져있어요...',
    '할게 너무 많아요...',
  ];
  const openWriteModal = function () {
    setIsWriteModalOpen(true);
  };
  const closeWriteModal = function () {
    setIsWriteModalOpen(false);
  };
  const openListModal = function () {
    setIsListModalOpen(true);
  };
  const closeListModal = function () {
    setIsListModalOpen(false);
  };
  return (
    <div
      className="relative flex flex-col bg-zp-white gap-1 justify-center items-center rounded-zp-radius-big"
      style={{ width: '12.5rem', height: '7rem' }}
    >
      {isNull ? (
        <p className="text-zp-xs text-zp-light-gray">공유할 메모 가져오기</p>
      ) : (
        <>
          <LuMaximize2
            className="absolute top-4 right-4 cursor-pointer"
            size={16}
            onClick={openListModal}
          />
          <div className="flex flex-col items-center gap-1">
            <div
              className="bg-zp-yellow bg-opacity-40 text-center text-zp-2xs flex justify-center items-center"
              style={{ width: '10rem', height: '1.5rem' }}
            >
              메모메모메모메모
            </div>
            <FiPlusCircle
              className="cursor-pointer"
              size={16}
              onClick={openWriteModal}
            />
          </div>
        </>
      )}
      <Modal
        isOpen={isListModalOpen}
        onRequestClose={closeListModal}
        style={customModalStyles}
      >
        <LuMinimize2
          className="absolute top-[1rem] right-[1rem] cursor-pointer"
          size={16}
          onClick={closeListModal}
        />
        <hr className="absolute top-[3rem] w-full border border-zp-sub-color" />
        <div className="flex flex-col gap-[1rem] w-full mt-[4rem] overflow-auto">
          {items.map((item, idx) => (
            <div
              className="relative flex flex-col p-[1rem] w-[24rem] h-[7rem] bg-zp-yellow bg-opacity-40 gap-[0.5rem]"
              key={idx}
            >
              <div className="flex justify-between items-start ">
                <div className="flex flex-col  ">
                  <p className="text-zp-sm  font-bold">작성자</p>
                  <p className="text-zp-2xs  ">작성일자</p>
                </div>
                <VscKebabVertical size={16} className="cursor-pointer" />
              </div>

              <p className="text-zp-2xs">{item}</p>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        isOpen={isWriteModalOpen}
        onRequestClose={closeWriteModal}
        style={customModalStyles}
      >
        <MdOutlineCancel
          className="absolute top-[1rem] right-[1rem] cursor-pointer"
          size={16}
          onClick={closeWriteModal}
        />
        <div className="flex flex-col items-center w-full mt-[1rem] px-[1rem] overflow-auto gap-[1rem]">
          <p className="text-zp-2xl font-bold">메모를 남겨주세요.</p>
          <div className="border border-zp-sub-color w-[22.5rem] h-[12rem] rounded-zp-radius-btn">
            인풋넣어야 함
          </div>
          <Button
            buttonType="second"
            children="메모 남기기"
            width={22.5}
            height={3}
            fontSize="xl"
            radius="btn"
          />
        </div>
      </Modal>
    </div>
  );
}
