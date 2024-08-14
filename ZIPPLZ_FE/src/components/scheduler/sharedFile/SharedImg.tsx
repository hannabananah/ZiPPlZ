import React, { useRef, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { LuMaximize2, LuMinimize2 } from 'react-icons/lu';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { addImg } from '@/apis/scheduler/schedulerApi';

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
  planSerial?: number;
}
export default function SharedImg({ fileList, planSerial }: Props) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleUpload = async (file: File) => {
    if (planSerial) {
      console.log(file);
      return await addImg(planSerial, file);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && planSerial) {
      // setSelectedFile(file);
      handleUpload(file);
      navigate(0);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const openModal = function () {
    setModalIsOpen(true);
  };
  const closeModal = function () {
    setModalIsOpen(false);
  };
  const openFullscreenImage = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };
  return (
    <>
      <div className="relative w-full h-[5rem] flex flex-col bg-zp-white gap-1 justify-center items-center rounded-zp-radius-big p-2 min-h-[5rem] max-h-[7rem]">
        {fileList.length === 0 ? (
          <>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[5rem]  cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center p-4">
                  <svg
                    className="w-8 h-8  text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-zp-sm text-center font-bold text-gray-500 dark:text-gray-400">
                    공유할 이미지를 업로드 해주세요
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </>
        ) : (
          <>
            <LuMaximize2
              className="absolute top-[10%] right-[5%] cursor-pointer"
              size="10%"
              onClick={openModal}
            />
            <div className="flex w-full items-center justify-center gap-4">
              <img
                className="w-[20%] aspect-square"
                src={fileList[0].saveFile}
                onClick={() => openFullscreenImage(fileList[0].saveFile)}
              />
              {fileList.length > 1 && (
                <img
                  className="w-[20%] aspect-square"
                  src={fileList[1].saveFile}
                  onClick={() => openFullscreenImage(fileList[1].saveFile)}
                />
              )}
              {fileList.length > 2 && (
                <img
                  className="w-[20%] aspect-square"
                  src={fileList[2].saveFile}
                  onClick={() => openFullscreenImage(fileList[2].saveFile)}
                />
              )}
              <div>
                <FiPlusCircle
                  className="cursor-pointer w-auto h-auto aspect-square"
                  onClick={handleClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
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
                  <img
                    className="w-full h-full"
                    src={item.saveFile}
                    onClick={() => openFullscreenImage(item.saveFile)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={fullscreenImage !== null}
          onRequestClose={closeFullscreenImage}
          style={customModalStyles}
        >
          <img
            src={fullscreenImage || ''}
            alt="Fullscreen"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onClick={closeFullscreenImage}
          />
        </Modal>
      </div>
    </>
  );
}
