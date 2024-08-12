import { ChangeEvent, useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { CiCirclePlus, CiSearch } from 'react-icons/ci';
import { FaCamera, FaRegCircle } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLoginUserStore } from '@/stores/loginUserStore';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import WorkerInfoListItem from '@components/worker/WorkerInfoListItem';
import { WorkerInfo } from '@pages/common/workerinfo/WorkerInfoList';
import { useHousePostStore } from '@stores/housePostStore';
import 'swiper/css';
import 'swiper/css/navigation';

export default function HousePostUpdate() {
  type Image = File | string;
  const { loginUser } = useLoginUserStore();
  const [images, setImages] = useState<Image[]>([]);
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<WorkerInfo[]>([]);
  const [tempSelectedWorkers, setTempSelectedWorkers] = useState<WorkerInfo[]>(
    []
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const maxImages = 10;

  const schedules = ['스케줄1', '스케줄2', '스케줄3'];

  const {
    title,
    setTitle,
    boardContent,
    setBoardContent,
    createPost,
    updatePost,
  } = useHousePostStore();

  useEffect(() => {
    if (location.state) {
      const { post, isEditMode } = location.state;
      setTitle(post.title);
      setWorkDetail(post.boardContent);
      setImages(post.images || []);
      setIsEditMode(isEditMode);
      setPostId(post.boardSerial);
    }
  }, [location.state]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages((prevImages) => [
      ...prevImages,
      ...files.slice(0, maxImages - prevImages.length),
    ]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

    setBoardContent(workDetail);

    const token = `Bearer ${localStorage.getItem('token')}`;
    const postData = {
      title,
      board_content: workDetail,
    };

    if (isEditMode && postId) {
      const { code, message } = await updatePost(token, postId, postData);
      if (code === 200) {
        alert('자랑글이 성공적으로 수정되었습니다.');
        navigate('/housepost');
      } else {
        alert(`자랑글 수정에 실패했습니다: ${message}`);
      }
    } else {
      const formData = new FormData();
      formData.append('params', JSON.stringify(postData));

      images.forEach((image) => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });

      const { code, message } = await createPost(token, formData);
      if (code === 200) {
        alert('자랑글이 성공적으로 등록되었습니다.');
        navigate('/housepost');
      } else {
        alert(`자랑글 등록에 실패했습니다: ${message}`);
      }
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

  const handleScheduleSelect = (schedule: string) => {
    setSchedule(schedule);
    setIsDropdownOpen(false);
  };

  const handleWorkerSelect = (worker: WorkerInfo) => {
    setTempSelectedWorkers((prevSelected) =>
      prevSelected.includes(worker)
        ? prevSelected.filter((w) => w !== worker)
        : [...prevSelected, worker]
    );
  };

  const handleWorkerModalConfirm = () => {
    setSelectedWorkers(tempSelectedWorkers);
    setIsWorkerModalOpen(false);
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
            <div className="flex-1 flex overflow-x-auto space-x-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 flex-shrink-0 ${index === 0 ? 'ml-4' : ''}`}
                >
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSchedule(e.target.value)
                    }
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
              {errors.schedule && (
                <div className="text-zp-red text-zp-xs mt-1">
                  {errors.schedule}
                </div>
              )}
            </div>
          </div>

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
              {selectedWorkers.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {selectedWorkers.map((worker) => (
                    <WorkerInfoListItem
                      key={worker.portfolio_serial}
                      worker={worker}
                    />
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

          <div className="mt-6 mb-12 font-bold h-20 flex items-center justify-center">
            <Button
              children={isEditMode ? '수정하기' : '확인'}
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
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50 overflow-y-auto">
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
                inputType="textArea"
                width="14rem"
                height={2.375}
                className="mb-4 pr-10"
                fontSize="xs"
                radius="btn"
                // 여기에 onChange 핸들러 추가
                onChange={() => {}}
              />
              <HiMagnifyingGlass className="absolute right-2 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {workers.map((worker) => (
                <div key={worker.user_serial} className="relative">
                  <WorkerInfoListItem worker={worker} />
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => handleWorkerSelect(worker)}
                  >
                    {tempSelectedWorkers.includes(worker) ? (
                      <FaRegCircleCheck size={24} className="text-green-500" />
                    ) : (
                      <FaRegCircle size={24} className="text-gray-500" />
                    )}
                  </div>
                </div>
              ))}
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
                  onClick={handleWorkerModalConfirm}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
