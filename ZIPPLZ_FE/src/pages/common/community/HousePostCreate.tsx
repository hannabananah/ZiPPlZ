import { ChangeEvent, useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FaCamera, FaRegCircle } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import WorkerInfoListItem from '@/components/worker/workerinfolist/WorkerInfoListItem';
import { useHousePostStore } from '@/stores/housePostStore';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import axios from 'axios';

interface WorkerInfo {
  user_serial: number;
  portfolio_serial: number;
  name: string;
  birth_date: number;
  temp: number;
  field_id: number;
  field_name: string;
  career: number;
  certificated_badge: number;
  locations: string[];
  img: string;
  worker?: number;
  user_name?: string;
  temperature?: number;
}

export default function HousePostCreate() {
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);
  // 시공업자 리스트 임시 저장
  const [tempSelectedWorkers, setTempSelectedWorkers] = useState<WorkerInfo[]>(
    []
  );
  const [workerInfoList, setWorkerInfoList] = useState<WorkerInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태 추가
  const [filteredWorkers, setFilteredWorkers] = useState<WorkerInfo[]>([]); // 검색 결과 상태

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const maxImages = 10;

  const { createPost, selectedWorkers, setSelectedWorkers, searchWorkers } =
    useHousePostStore();

  // 페이지 로드 시 selectedWorkers 초기화
  useEffect(() => {
    setSelectedWorkers([]);
    fetchWorkerInfoList();
  }, [setSelectedWorkers]);

  const fetchWorkerInfoList = async () => {
    try {
      const response = await axios.get('/api/workerlist/portfolios');
      if (response.data.proc.code === 200) {
        setWorkerInfoList(response.data.data);
        setFilteredWorkers(response.data.data); // 초기에는 전체 목록 표시
      } else {
        console.error(
          'Failed to fetch worker info list:',
          response.data.proc.message
        );
      }
    } catch (error) {
      console.error('Error fetching worker info list:', error);
    }
  };

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = await searchWorkers(query);

      // 타입 단언을 사용하여 TypeScript에게 이 데이터가 WorkerInfo[]라고 알림
      setFilteredWorkers(results as WorkerInfo[]);
    } else {
      setFilteredWorkers(workerInfoList); // 검색어가 없을 때는 전체 목록 표시
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.slice(0, maxImages - images.length);

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleConfirm = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = '제목이 입력되지 않았습니다';
    if (!workDetail) newErrors.workDetail = '내용이 입력되지 않았습니다';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();

    // 기본 필드들을 FormData에 추가
    formData.append('title', title);
    formData.append('board_content', workDetail);

    const selectedPortfolioJson = JSON.stringify(
      selectedWorkers.map((worker) => ({
        portfolio_serial: worker.portfolio_serial,
        birth_date: worker.birth_date,
        field_id: worker.field_id,
        field_name: worker.field_name,
        career: worker.career,
        certificated_badge: worker.certificated_badge,
        locations: worker.locations,
        img: worker.img,
      }))
    );
    formData.append('selected_portfolio', selectedPortfolioJson);

    // 이미지가 없을 경우 null 값을 추가
    if (images.length === 0) {
      formData.append('images', 'null');
    } else {
      // 이미지 파일들을 FormData에 추가
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      const token = `Bearer ${localStorage.getItem('token')}`;
      const response = await createPost(token, formData);

      if (response.code === 200) {
        alert('자랑글이 성공적으로 등록되었습니다.');
        navigate('/housepost');
      } else {
        alert(`자랑글 등록에 실패했습니다: ${response.message}`);
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/housepost');
  };

  const handleWorkerSelect = (worker: WorkerInfo) => {
    setTempSelectedWorkers((prevSelected) =>
      prevSelected.includes(worker)
        ? prevSelected.filter((w) => w !== worker)
        : [...prevSelected, worker]
    );
  };

  const handleWorkerModalConfirm = () => {
    // 필요한 속성을 추가하여 setSelectedWorkers에 전달
    const updatedWorkers = tempSelectedWorkers.map((worker) => ({
      ...worker,
      worker: worker.user_serial, // worker 속성 추가
      user_name: worker.name, // user_name 속성 추가
      temperature: worker.temp, // temperature 속성 추가
    }));

    setSelectedWorkers(updatedWorkers);
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
                  htmlFor="file-upload-0"
                  className="flex items-center justify-center w-24 h-24 bg-zp-white border border-zp-light-gray rounded-zp-radius-btn p-2 cursor-pointer"
                >
                  <FaCamera size={36} className="" />
                  <div className="w-full flex justify-center absolute bottom-2 font-bold text-zp-xs text-zp-gray">
                    {images.length}/{maxImages}
                  </div>
                </label>
                <input
                  id="file-upload-0"
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
                  className={`relative w-24 h-24 flex-shrink-0 ${
                    index === 0 ? 'ml-4' : ''
                  }`}
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

      {isWorkerModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-zp-white p-6 rounded-zp-radius-big">
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
                value={searchQuery} // 검색어 상태 연결
                onChange={handleSearchChange} // 검색어 변경 시 호출
              />
              <HiMagnifyingGlass className="absolute right-2 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredWorkers.map((worker) => (
                <div key={worker.portfolio_serial} className="relative">
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
