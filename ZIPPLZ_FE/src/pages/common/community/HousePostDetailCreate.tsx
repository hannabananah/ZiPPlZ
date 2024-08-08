import { ChangeEvent, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { CiCirclePlus, CiSearch } from 'react-icons/ci';
import { CiCircleCheck } from 'react-icons/ci';
import { FaRegCircle } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import WorkerInfoListItem from '@components/worker/WorkerInfoListItem';
import { WorkerInfo } from '@pages/common/workerinfo/WorkerInfoList';
import 'swiper/css';
import 'swiper/css/navigation';
// Import Swiper styles for navigation
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

// 이미지 상태의 타입 정의
type Image = string;

// 더미 데이터 생성
const workers: WorkerInfo[] = [
  {
    user_serial: 1,
    portfolio_serial: 1,
    name: '시공자1',
    birth_date: 1990,
    temp: 36.5,
    field_id: 1,
    field_name: '전기',
    career: 3,
    certificated_badge: 1,
    locations: ['서울 강남구'],
    img: '/',
  },
  {
    user_serial: 1,
    portfolio_serial: 1,
    name: '시공자2',
    birth_date: 1990,
    temp: 36.5,
    field_id: 1,
    field_name: '전기',
    career: 3,
    certificated_badge: 1,
    locations: ['서울 강남구'],
    img: '/',
  },
  {
    user_serial: 1,
    portfolio_serial: 1,
    name: '시공자3',
    birth_date: 1990,
    temp: 36.5,
    field_id: 1,
    field_name: '전기',
    career: 3,
    certificated_badge: 1,
    locations: ['서울 강남구'],
    img: '/',
  },
  {
    user_serial: 1,
    portfolio_serial: 1,
    name: '시공자4',
    birth_date: 1990,
    temp: 36.5,
    field_id: 1,
    field_name: '전기',
    career: 3,
    certificated_badge: 1,
    locations: ['서울 강남구'],
    img: '/',
  },
  {
    user_serial: 1,
    portfolio_serial: 1,
    name: '시공자5',
    birth_date: 1990,
    temp: 36.5,
    field_id: 1,
    field_name: '전기',
    career: 3,
    certificated_badge: 1,
    locations: ['서울 강남구'],
    img: '/',
  },
  // 다른 worker 정보 추가
];

export default function HousePostDetailCreate() {
  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const maxImages = 10;

  // 스케줄 더미 데이터
  const schedules = ['스케줄1', '스케줄2', '스케줄3'];

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
          schedule,
        },
      },
    });
  };

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/FindWorkerList');
  };

  // Daum Postcode Complete Handler
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

  const handleScheduleSelect = (schedule: string) => {
    setSchedule(schedule);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          {/* 나가기 버튼, 구인 글쓰기 text */}
          <div className="mt-12 flex items-center justify-between w-full">
            <div className="flex items-center">
              {/* 나가기 버튼 */}
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
              />
            </div>
            <div className="relative right-4 text-zp-2xl font-bold text-center flex-1">
              자랑하기
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
                  className="flex items-center justify-center w-24 h-24 bg-zp-white border border-zp-light-gray rounded-zp-radius-btn p-2 cursor-pointer"
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
              <div className="bg-zp-white border border-zp-light-gray rounded-zp-radius-btn pl-2">
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

          {/* 현장 주소 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">현장 주소</div>
              <div className="pl-2 relative mt-2 bg-zp-white border  border-zp-light-gray rounded-zp-radius-btn">
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
                  onClick={() => setIsPostcodeOpen(true)}
                />
                <CiSearch
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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

          {/* 상세 주소 input */}
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
                  className=""
                  fontSize="xs"
                  radius="btn"
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

          {/* 스케줄 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center relative">
            <div className="text-left w-full">
              <div className="mb-2">스케줄</div>
              <div className="bg-zp-white border border-zp-light-gray rounded-zp-radius-btn pl-2 relative">
                <div className="flex justify-end items-center">
                  <Input
                    type="text"
                    placeholder="스케줄을 선택해주세요."
                    inputType="textArea"
                    width="100%"
                    height={2.375}
                    className=""
                    fontSize="xs"
                    radius="btn"
                    value={schedule}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    readOnly
                  />
                  {isDropdownOpen ? (
                    <IoMdArrowDropup
                      size={40}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <IoMdArrowDropdown
                      size={40}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-zp-white border border-zp-light-gray shadow-lg rounded-zp-radius-big z-50">
                  {schedules.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleScheduleSelect(item)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-bold text-zp-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
              {errors.workDetail && (
                <div className="text-zp-red text-zp-xs mt-1">
                  {errors.workDetail}
                </div>
              )}
            </div>
          </div>

          {/* 자랑해주세요 내용 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="mb-2">자랑해주세요</div>
              <div className="bg-zp-white border border-zp-light-gray rounded-zp-radius-btn  pl-2">
                <Input
                  type="text"
                  placeholder="집에서 자랑하고 싶은 내용을 입력해주세요."
                  inputType="textArea"
                  width="100%"
                  height={10}
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

          {/* 함께한 시공업자들 내용 input */}
          <div className="mt-6 font-bold flex flex-col items-center justify-center">
            <div className="text-left w-full">
              <div className="">함께한 시공업자들</div>
              <div className="text-zp-xs text-zp-light-gray">
                + 버튼을 클릭하여 함께한 시공업자들을 추가해주세요
              </div>

              <div className="py-24 flex justify-center">
                <CiCirclePlus
                  style={{ color: 'gray' }}
                  size={40}
                  onClick={() => setIsWorkerModalOpen(true)}
                  className="cursor-pointer"
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
              fontSize="xl"
              radius="btn"
              onClick={handleConfirm}
            />
          </div>
        </div>
      </div>

      {/* Daum Postcode Modal */}
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

      {isWorkerModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50">
          <div className="bg-zp-white p-6 rounded-zp-radius-big w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="absolute left-1/2 transform -translate-x-1/2 text-zp-xl font-bold">
                시공업자 선택
              </h2>
            </div>

            <div className="mt-6 font-bold">
              시공업자의 이름을 검색하여 추가하고 확인 버튼을 눌러주세요
            </div>

            <div className="mt-6 font-bold flex justify-center items-center relative">
              <Input
                type="text"
                placeholder="시공업자의 이름을 입력해주세요"
                inputType="text"
                width="14rem"
                height={2.375}
                className="mb-4 pr-10"
                fontSize="xs"
                radius="btn"
                // 검색 기능 추가 필요
              />
              <HiMagnifyingGlass className="absolute right-2 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* 시공업자 정보 좌우로 넘겨보기 */}
            <div className="mt-2">
              <Swiper
                spaceBetween={10}
                slidesPerView={2} // 한 화면에 3개의 슬라이드를 보여줍니다
                navigation
              >
                {workers.map((worker) => (
                  <SwiperSlide key={worker.user_serial}>
                    <div className="w-30">
                      <WorkerInfoListItem worker={worker} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-6 flex justify-center space-x-2">
              <div className="font-bold">
                <Button
                  children="취소"
                  buttonType="light"
                  width="7rem"
                  height={2}
                  fontSize="2xs"
                  radius="full"
                  onClick={() => setIsWorkerModalOpen(false)}
                />
              </div>
              <div className="font-bold">
                <Button
                  children="확인"
                  buttonType="second"
                  width="7rem"
                  height={2}
                  fontSize="2xs"
                  radius="full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
