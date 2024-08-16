import { ChangeEvent, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { CiSearch } from 'react-icons/ci';
import { FaCamera } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

const postCodeStyle = {
  width: '200px',
  height: '30rem',
};
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
    height: '30rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'center',
    padding: '1.5rem',
    zIndex: 1500,
  },
};
const board = {
  board: {
    title: '구인구직글3',
    nickname: 'user1',
    userSerial: 1,
    boardSerial: 7,
    hit: 0,
    boardType: 3,
    boardContent: '구인구직글3_content',
    boardDate: '2024-08-08T23:49:59.988909',
  },
  board_images: [
    {
      fileName: 'file_name13',
      saveFile: 'save_file_path13',
      boardSerial: 7,
      fileSerial: 13,
      saveFolder: 'save_folder_path13',
      originalFile: 'original_file_path13',
    },
    {
      fileName: 'file_name14',
      saveFile: 'save_file_path14',
      boardSerial: 7,
      fileSerial: 14,
      saveFolder: 'save_folder_path14',
      originalFile: 'original_file_path14',
    },
    {
      fileName: 'file_name15',
      saveFile: 'save_file_path15',
      boardSerial: 7,
      fileSerial: 15,
      saveFolder: 'save_folder_path15',
      originalFile: 'original_file_path15',
    },
  ],
  comments: [
    {
      parent_comment: {
        userSerial: 1,
        boardSerial: 7,
        commentSerial: 13,
        parentCommentSerial: -1,
        commentContent: '치매세요?',
        commentDate: '2024-08-08T23:51:36.86451',
        orderNumber: 3,
        isDeleted: 0,
      },
      child_comments: [
        {
          userSerial: 1,
          boardSerial: 7,
          commentSerial: 14,
          parentCommentSerial: 13,
          commentContent: '치매세요?',
          commentDate: '2024-08-08T23:51:57.047113',
          orderNumber: 4,
          isDeleted: 0,
        },
        {
          userSerial: 1,
          boardSerial: 7,
          commentSerial: 15,
          parentCommentSerial: 13,
          commentContent: '치매세요?',
          commentDate: '2024-08-08T23:52:00.205974',
          orderNumber: 5,
          isDeleted: 0,
        },
      ],
    },
  ],
};
// 이미지 상태의 타입 정의
type Image = string;

export default function UpdateFindWorker() {
  const [openDaum, setOpenDaum] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>(
    board.board_images.map((img) => img.saveFile)
  );
  const [title, setTitle] = useState<string>(board.board.title);
  const [address, setAddress] = useState<string>('주소');
  const [workDetail, setWorkDetail] = useState<string>(
    board.board.boardContent
  );
  const onCompletePost = (data: any) => {
    setAddress(data.address);
    setOpenDaum(false);
  };
  const navigate = useNavigate();

  //리스트 이동
  const goList = () => navigate('/workers/findworker');

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const readerPromises = files.map((file) => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((results) => {
      setImages((prevImages) => [
        ...prevImages,
        ...results.slice(0, 10 - prevImages.length),
      ]);
    });
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    goList();
  };

  return (
    <>
      <div className="flex flex-col w-full p-6 mt-[3rem] gap-4">
        <div className="w-full relateive">
          {/* 나가기 버튼, 구인 글쓰기 text */}
          <GoArrowLeft className="absolute cursor-pointer" onClick={goList} />
          <p className="w-full font-extrabold text-center align-text-top text-zp-xl">
            구인 글쓰기
          </p>
        </div>
        {/* 게시판 가이드 */}
        <div className="flex flex-col w-full gap-1">
          <p className="font-bold text-zp-xl">
            현장이나 일과 관련된 사진을 올려주세요.(선택사항)
          </p>
          <p className="text-zp-xs text-zp-light-gray">
            사진을 첨부하면 시공자가 작업내용에 대해 보다 상세하게 파악할 수
            있어요.
          </p>
        </div>
        {/* 사진 첨부 버튼 */}
        <div className="flex items-start gap-1">
          <div className="flex flex-col items-center justify-center w-[5rem] aspect-square relative bg-zp-light-gray rounded-zp-radius-big">
            <label htmlFor="file-upload">
              <FaCamera size={36} className="" />
              <p className="font-bold text-center text-zp-xs text-zp-gray">
                {images.length}/10
              </p>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              multiple
            />
          </div>
          {/* 사진 미리보기 */}
          <div className="flex overflow-x-auto">
            {images.map((image, index) => (
              <div key={index} className="relative w-[5rem] h-[5rem] ">
                <img
                  src={image}
                  className="w-full h-full opacity-50 rounded-zp-radius-big"
                  onClick={() => handleImageRemove(index)}
                />
                <MdClose
                  size={24}
                  onClick={() => handleImageRemove(index)}
                  className="absolute text-white bg-red-500 rounded-full top-1 right-1"
                />
              </div>
            ))}
          </div>
        </div>
        {/* 제목 input */}
        <div className="flex flex-col w-full gap-1">
          <p className="font-bold text-zp-md">제목</p>
          <Input
            type="text"
            placeholder="제목을 입력 해주세요."
            inputType="login"
            width="100%"
            height={2}
            className=""
            fontSize="xs"
            radius="none"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        {/* 현장 주소 input */}
        <div className="relative flex flex-col w-full gap-1">
          <p className="font-bold text-zp-md">현장 주소</p>
          <Input
            type="text"
            placeholder="작업을 희망하는 주소를 입력해주세요."
            inputType="login"
            width="100%"
            height={2}
            fontSize="xs"
            radius="none"
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
          <CiSearch
            size={16}
            className="absolute right-3 top-[2rem]"
            onClick={() => setOpenDaum(true)}
          />
        </div>
        {/* 작업 내용 input */}
        <div className="flex flex-col w-full gap-4">
          <p className="font-bold text-zp-md">작업내용</p>
          <textarea
            placeholder="희망하시는 작업 또는 시공에 대해 입력해주세요."
            value={workDetail}
            className="w-full h-[15rem] p-4 border text-zp-xs border-zp-main-color rounded-zp-radius-btn bg-zp-transparent"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setWorkDetail((e.target as HTMLTextAreaElement).value)
            }
          />
        </div>
        <Button
          children="확인"
          buttonType="second"
          width="full"
          height={3}
          fontSize="xl"
          radius="btn"
          onClick={handleConfirm}
        />
      </div>
      <Modal
        style={customModalStyles}
        isOpen={openDaum}
        onRequestClose={onCompletePost}
      >
        <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />
      </Modal>
    </>
  );
}
