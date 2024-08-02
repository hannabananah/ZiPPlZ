import { ChangeEvent, useState } from 'react';
import { CiCamera, CiSearch } from 'react-icons/ci';
import { GoArrowLeft } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

// 이미지 상태의 타입 정의
type Image = string;

// 상태와 핸들러 인자의 타입을 정의합니다.
export default function FindWorkerDetailCreate() {
  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');

  const navigate = useNavigate();
  const maxImages = 10;

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
        ...results.slice(0, maxImages - prevImages.length),
      ]);
    });
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    navigate('/FindWorkerList', {
      state: {
        newPost: {
          title,
          address,
          addressDetail,
          workDetail,
        },
      },
    });
  };

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/FindWorkerList');
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* 나가기 버튼, 구인 글쓰기 text */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
              />
            </div>
            <div className="text-zp-xl font-bold text-center flex-1">
              구인 글쓰기
            </div>
            <div className="w-8"></div> {/* 여백 추가, 필요에 따라 조정 */}
          </div>

          {/* 게시판 가이드 */}
          <div className="font-bold h-20 flex items-center justify-start">
            <div className="text-left">
              <div>현장이나 일과 관련된 사진을 올려주세요.(선택사항)</div>
              <div className="text-zp-xs text-zp-gray">
                사진을 첨부하면 시공자가 작업내용에 대해 보다 상세하게 파악할 수
                있어요.
              </div>
            </div>
          </div>

          {/* 사진 첨부 버튼 */}
          <div className="flex items-start mt-6 space-x-4">
            <div className="w-1/6">
              <div className="relative">
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-20 h-20 bg-zp-white border border-zp-main-color rounded-zp-radius-btn p-2 cursor-pointer"
                >
                  <CiCamera size={24} className="text-zp-main-color" />
                  <div className="absolute bottom-2 text-zp-xs text-zp-gray">
                    {images.length}/{maxImages}
                  </div>
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
            </div>
            {/* 사진 미리보기 */}
            <div className="flex-1 flex overflow-x-auto space-x-2">
              {images.map((image, index) => (
                <div key={index} className="relative w-20 h-20 flex-shrink-0">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-md border border-gray-300"
                    onClick={() => handleImageRemove(index)}
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <MdClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 제목 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">제목</div>
              <div className="bg-zp-white border rounded-zp-radius-btn">
                <Input
                  type="text"
                  placeholder="제목 입력"
                  inputType="textArea"
                  width="100%"
                  height={2.375}
                  className=""
                  fontSize="xs"
                  radius="btn"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* 현장 주소 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">현장 주소</div>
              <div className="relative mt-2 bg-zp-white border rounded-zp-radius-btn">
                <Input
                  type="text"
                  placeholder="현장 주소"
                  inputType="textArea"
                  width="100%"
                  height={2.375}
                  className="border border-zp-sub-color rounded-zp-radius-btn p-[10px] pr-[40px]"
                  fontSize="xs"
                  radius="btn"
                  value={address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                  }
                />
                <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* 상세 주소 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">상세 주소</div>
              <div className="bg-zp-white border rounded-zp-radius-btn">
                <Input
                  type="text"
                  placeholder="상세 주소"
                  inputType="textArea"
                  width="100%"
                  height={2.375}
                  className=""
                  fontSize="xs"
                  radius="btn"
                  value={addressDetail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddressDetail(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* 작업 내용 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">작업내용</div>
              <div className="bg-zp-white border rounded-zp-radius-btn">
                <Input
                  type="text"
                  placeholder="시공을 요청하는 작업에 대해 작성해주세요."
                  inputType="textArea"
                  width="100%"
                  height={2.375}
                  className=""
                  fontSize="xs"
                  radius="btn"
                  value={workDetail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWorkDetail(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-6 font-bold h-20 flex items-center justify-center">
            <Button
              children="확인"
              buttonType="second"
              width="full"
              height={2.375}
              fontSize="xl"
              radius="btn"
              onClick={handleConfirm}
            />
          </div>
        </div>
      </div>

      {/* 추가 해야 하는 기능 */}
      {/* 같은 사진 파일 안올라가게 */}
      {/* 사진 10장 넘게 올리려하면 메시지 뜨게 */}
    </>
  );
}
