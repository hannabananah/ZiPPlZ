import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { LuMaximize2, LuMinimize2 } from 'react-icons/lu';
import Modal from 'react-modal';

import { ImageDragIcon } from '@assets/svg/icons';
import Button from '@components/common/Button';

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
    maxHeight: '468px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 1500,
  },
};
Modal.setAppElement('#root');
interface Props {
  fileList: any;
}
export default function SharedImg({ fileList }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = function () {
    setModalIsOpen(true);
  };
  const closeModal = function () {
    setModalIsOpen(false);
  };
  return (
    <>
      <div className="relative w-full flex flex-col bg-zp-white gap-1 justify-center items-center rounded-zp-radius-big p-2 min-h-[5rem] max-h-[7rem]">
        {fileList.length === 0 ? (
          <>
            <ImageDragIcon className="max-w-[18%] aspect-square" />
            <p className="text-zp-2xs text-zp-light-gray">
              공유할 이미지 가져오기
            </p>
            <Button
              buttonType="normal"
              children="이미지 가져오기"
              width={7}
              height={1}
              fontSize="2xs"
              radius="btn"
            />
          </>
        ) : (
          <>
            <LuMaximize2
              className="absolute top-[10%] right-[5%] cursor-pointer"
              size="10%"
              onClick={openModal}
            />
            <div className="flex w-full items-center justify-center gap-4">
              <img className="border w-[18%] aspect-square" src={fileList[0]} />
              {fileList.length > 1 && (
                <img
                  className="border w-[18%] aspect-square"
                  src={fileList[1]}
                />
              )}
              {fileList.length > 2 && (
                <img
                  className="border w-[18%] aspect-square"
                  src={fileList[2]}
                />
              )}
              <FiPlusCircle
                className="cursor-pointer"
                size="9%"
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
            <div className="grid grid-cols-3 gap-4">
              {fileList.map((item: any) => (
                <div className="border aspect-square" key={item.fileSerial}>
                  <img className="w-full h-full" src={item.saveFile} />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
