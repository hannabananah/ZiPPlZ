import { ChangeEvent, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { FaCamera } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useHousePostStore } from '@stores/housePostStore';

export default function HousePostCreate() {
  const {
    title,
    setTitle,
    boardContent,
    setBoardContent,
    createPost,
    setImages,
  } = useHousePostStore();
  const [images, setImagesState] = useState<File[]>([]);
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const maxImages = 10;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImagesState((prevImages) => [
      ...prevImages,
      ...files.slice(0, maxImages - prevImages.length),
    ]);
    setImages([...images, ...files.slice(0, maxImages - images.length)]);
  };

  const handleImageRemove = (index: number) => {
    setImagesState((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  const handleConfirm = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = '제목이 입력되지 않았습니다';
    if (!address) newErrors.address = '현장 주소가 입력되지 않았습니다';
    if (!addressDetail)
      newErrors.addressDetail = '상세 주소가 입력되지 않았습니다';
    if (!schedule) newErrors.schedule = '스케줄이 선택되지 않았습니다';
    if (!workDetail) newErrors.workDetail = '내용이 입력되지 않았습니다';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setBoardContent(workDetail); // 상태에 workDetail 저장

    const token = `Bearer ${localStorage.getItem('token')}`;
    const formData = new FormData();

    // 이미지 파일 추가
    images.forEach((image) => formData.append('images', image));

    // 제목과 내용 추가
    formData.append('title', title);
    formData.append('board_content', boardContent);

    // 선택된 포트폴리오 추가 (예제 데이터)
    formData.append(
      'selected_portfolio',
      JSON.stringify([
        {
          portfolio_serial: 1,
          worker: 1,
          user_name: 'celine5',
          birth_date: 99,
          temperature: 10.0,
          field_id: 1,
          field_name: '철거',
          career: 3.0,
          certificated_badge: 1,
          locations: ['서울 강남구', '서울 강서구'],
          img: 'save_file_path1',
        },
        {
          portfolio_serial: 2,
          worker: 1,
          user_name: 'celine5',
          birth_date: 99,
          temperature: 20.0,
          field_id: 2,
          field_name: '설비',
          career: 30.0,
          certificated_badge: 1,
          locations: ['서울 강남구', '서울 강서구'],
          img: 'save_file_path2',
        },
      ])
    );

    const { code, message } = await createPost(token, formData);

    if (code === 200) {
      alert('자랑글이 성공적으로 등록되었습니다.');
      navigate('/housepost');
    } else {
      alert(`자랑글 등록에 실패했습니다: ${message}`);
    }
  };

  const handleGoBack = () => {
    navigate('/housepost');
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? ', ' : '') + data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          <div className="mt-12 flex items-center justify-between w-full">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
              />
            </div>
            <div className="relative right-4 text-zp-2xl font-bold text-center flex-1">
              자랑하기
            </div>
          </div>

          <div className="mt-6 font-bold flex items-center justify-start">
            <div className="text-left">
              <div>현장이나 일과 관련된 사진을 올려주세요.(선택사항)</div>
              <div className="text-zp-xs text-zp-light-gray">
                사진을 첨부하면 시공자가 작업내용에 대해 보다 상세하게 파악할 수
                있어요.
              </div>
            </div>
          </div>

          <div className="flex items-start mt-6 space-x-4">
            <div className="w-1/6">
              <div className="relative">
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-24 h-24 bg-zp-white border border-zp-light-gray rounded-zp-radius-btn p-2 cursor-pointer"
                >
                  <FaCamera size={36} />
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
            <div className="flex-1 flex overflow-x-auto space-x-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 flex-shrink-0 ${index === 0 ? 'ml-4' : ''}`}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-zp-radius-btn"
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

          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">제목</div>
              <div className="bg-zp-white border border-zp-light-gray rounded-zp-radius-btn pl-2">
                <Input
                  type="text"
                  placeholder="제목 입력"
                  inputType="textArea"
                  width="100%"
                  height={2.375}
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

          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">현장 주소</div>
              <div className="pl-2 relative mt-2 bg-zp-white border border-zp-light-gray rounded-zp-radius-btn">
                <Input
                  type="text"
                  placeholder="현장 주소"
                  inputType="textArea"
                  width="100%"
                  height={2.375}
                  value={address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                  }
                  onClick={() => setIsPostcodeOpen(true)}
                />
              </div>
              {errors.address && (
                <div className="text-zp-red text-zp-xs mt-1">
                  {errors.address}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">상세 주소</div>
              <div className="bg-zp-white border border-zp-light-gray rounded-zp-radius-btn pl-2">
                <Input
                  type="text"
                  placeholder="상세 주소"
                  inputType="textArea"
                  width="100%"
                  height={2.375}
                  value={addressDetail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddressDetail(e.target.value)
                  }
                />
              </div>
              {errors.addressDetail && (
                <div className="text-zp-red text-zp-xs mt-1">
                  {errors.addressDetail}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">자랑해주세요</div>
              <div className="bg-zp-white border border-zp-light-gray rounded-zp-radius-btn pl-2">
                <Input
                  type="text"
                  placeholder="집에서 자랑하고 싶은 내용을 입력해주세요."
                  inputType="textArea"
                  width="100%"
                  height={10}
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

          <div className="mt-6 mb-12 font-bold h-20 flex items-center justify-center">
            <Button
              children="확인"
              buttonType="second"
              width="full"
              height={2.375}
              onClick={handleConfirm}
              fontSize="xl"
              radius="big"
            />
          </div>
        </div>
      </div>

      {isPostcodeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50">
          <div className="bg-zp-white p-4 rounded-zp-radius-big">
            <DaumPostcode onComplete={handleComplete} />
            <button
              className="mt-2 w-full bg-zp-sub-color rounded-zp-radius-big font-bold p-2"
              onClick={() => setIsPostcodeOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
