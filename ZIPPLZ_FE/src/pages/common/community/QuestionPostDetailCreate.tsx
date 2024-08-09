import { ChangeEvent, useState } from 'react';
// import { CiSearch } from 'react-icons/ci';
import { FaCamera } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

// 이미지 상태의 타입 정의
type Image = string;

export default function QuestionPostDetailCreate() {
  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>('');
  const [address] = useState<string>('');
  const [addressDetail] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = '제목이 입력되지 않았습니다';
    if (!address) newErrors.address = '현장 주소가 입력되지 않았습니다';
    if (!addressDetail)
      newErrors.addressDetail = '상세 주소가 입력되지 않았습니다';
    if (!workDetail) newErrors.workDetail = '작업내용이 입력되지 않았습니다';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        <div className="w-full">
          {/* 나가기 버튼, 구인 글쓰기 text */}
          <div className="mt-12 flex items-center justify-between w-full">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
              />
            </div>
            <div className="relative right-4 text-zp-xl font-bold text-center flex-1">
              질문하기
            </div>
          </div>

          {/* 게시판 가이드 */}
          <div className="mt-6 font-bold flex items-center justify-start">
            <div className="text-left">
              <div>현장이나 일과 관련된 사진을 올려주세요.(선택사항)</div>
              <div className="text-zp-xs text-zp-light-gray">
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
                  className="flex items-center justify-center w-24 h-24 bg-zp-white border border-zp-main-color rounded-zp-radius-btn p-2 cursor-pointer"
                >
                  <FaCamera size={36} className="" />
                  <div className="w-full flex justify-center absolute bottom-2 font-bold text-zp-xs text-zp-gray">
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
            <div className="flex-1 flex overflow-x-auto space-x-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 flex-shrink-0 ${index === 0 ? 'ml-4' : ''}`}
                >
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-zp-radius-btn"
                    onClick={() => handleImageRemove(index)}
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <MdClose size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 제목 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">제목</div>
              <div className="bg-zp-white border rounded-zp-radius-btn pl-2">
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
              {errors.title && (
                <div className="text-zp-red text-zp-xs mt-1">
                  {errors.title}
                </div>
              )}
            </div>
          </div>

          {/* 작업 내용 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">질문</div>
              <div className="bg-zp-white border rounded-zp-radius-btn  pl-2">
                <Input
                  type="text"
                  placeholder="질문 작성"
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
              {errors.workDetail && (
                <div className="text-zp-red text-zp-xs mt-1">
                  {errors.workDetail}
                </div>
              )}
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
    </>
  );
}
