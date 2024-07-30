import { useState } from 'react';
import { CiCamera, CiSearch } from 'react-icons/ci';
import { GoArrowLeft } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@components/common/Input';

export default function FindWorkerDetailCreate() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [workDetail, setWorkDetail] = useState('');

  const navigate = useNavigate();
  const maxImages = 10;

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const readerPromises = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
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

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

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
          <div className="font-bold h-32 flex items-center">
            <div className="text-left w-1/6">
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
            <div className="w-full flex overflow-x-auto mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-20 h-20 mr-2">
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
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setAddress(e.target.value)}
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
                  onChange={(e) => setAddressDetail(e.target.value)}
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
                  onChange={(e) => setWorkDetail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 font-bold h-20 flex items-center justify-center">
            <Button
              buttonType="second"
              width="full"
              height={2.375}
              fontSize="xl"
              radius="btn"
              onClick={handleConfirm}
              className="flex items-center justify-center w-full"
            >
              <span className="ml-2">채팅하기</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
