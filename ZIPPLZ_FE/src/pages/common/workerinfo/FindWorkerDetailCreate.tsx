import React, { useState } from 'react';
import { CiCamera, CiSearch } from 'react-icons/ci';
import { GoArrowLeft } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function FindWorkerDetailCreate() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [workDetail, setWorkDetail] = useState('');

  const navigate = useNavigate();

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
      setImages((prevImages) => [...prevImages, ...results]);
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
      {/* 나가기 버튼, 구인 글쓰기 text */}
      <div className="flex items-center justify-between w-full px-6">
        <div className="flex items-center">
          <GoArrowLeft className="mr-6 cursor-pointer" onClick={handleGoBack} />
        </div>
        <div className="font-['nanum'] text-zp-xl font-bold text-center flex-1">
          구인 글쓰기
        </div>
      </div>

      {/* 게시판 가이드 */}
      <div className="font-['nanum'] font-bold h-20 flex items-center justify-center">
        <div className="text-left">
          <div>현장이나 일과 관련된 사진을 올려주세요.(선택사항)</div>
          <div className="font-['nanum'] text-zp-xs text-zp-gray">
            사진을 첨부하면 시공자가 작업내용에 대해 보다 상세하게 파악할 수
            있어요.
          </div>
        </div>
      </div>

      {/* 사진 첨부 버튼 */}
      <div className="font-['nanum'] font-bold h-20 flex items-center justify-center">
        <div className="text-left">
          <div className="relative mt-2">
            <label
              htmlFor="file-upload"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <CiCamera size={24} />
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
          {images.length > 0 && (
            <div className="relative mt-4 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-[100px] h-[100px] object-cover"
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
          )}
        </div>
      </div>

      {/* 제목 input */}
      <div className="font-['nanum'] font-bold h-20 flex items-center justify-center">
        <div className="text-left">
          <div>제목</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-zp-sub-color rounded-zp-radius-btn w-[550px] h-[38px] mt-2 p-[10px]"
            type="text"
            name="title"
            placeholder="제목 입력"
          />
        </div>
      </div>

      {/* 현장 주소 input */}
      {/* 추후 주소 api 적용해서 기능 구현 예정 */}
      <div className="font-['nanum'] font-bold h-20 flex items-center justify-center">
        <div className="text-left">
          <div>현장 주소</div>
          <div className="relative mt-2">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-zp-sub-color rounded-zp-radius-btn w-[550px] h-[38px] p-[10px] pr-[40px]"
              type="text"
              name="address"
              placeholder="현장 주소"
            />
            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* 상세 주소 input */}
      <div className="font-['nanum'] font-bold h-20 flex items-center justify-center">
        <div className="text-left">
          <div>상세 주소</div>
          <input
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            className="border border-zp-sub-color rounded-zp-radius-btn w-[550px] h-[38px] mt-2 p-[10px]"
            type="text"
            name="addressDetail"
            placeholder="상세 주소"
          />
        </div>
      </div>

      {/* 작업 내용 input */}
      <div className="font-['nanum'] font-bold h-20 flex items-center justify-center">
        <div className="text-left">
          <div>작업내용</div>
          <input
            value={workDetail}
            onChange={(e) => setWorkDetail(e.target.value)}
            className="border border-zp-sub-color rounded-zp-radius-btn w-[550px] h-[38px] mt-2 p-[10px]"
            type="text"
            name="workDetail"
            placeholder="시공을 요청하는 작업에 대해 작성해주세요."
          />
        </div>
      </div>

      <div className="font-['nanum'] font-bold h-20 flex items-center justify-center">
        <div className="text-left">
          <button
            onClick={handleConfirm}
            className="w-[550px] h-[38px] bg-zp-sub-color rounded-zp-radius-btn text-white zp-radius-btn"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}
