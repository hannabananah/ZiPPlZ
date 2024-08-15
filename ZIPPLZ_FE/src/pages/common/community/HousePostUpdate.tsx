import { ChangeEvent, useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FaRegCircle } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa6';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import WorkerInfoListItem from '@components/worker/WorkerInfoListItem';
import { useHousePostStore } from '@stores/housePostStore';
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
}

export default function HousePostUpdate() {
  type Image = File | string;
  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>('');
  const [boardContent, setBoardContent] = useState<string>('');
  const [tempSelectedWorkers, setTempSelectedWorkers] = useState<WorkerInfo[]>(
    []
  );
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);
  const [workerInfoList, setWorkerInfoList] = useState<WorkerInfo[]>([]);

  const [postId, setPostId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const location = useLocation();
  const maxImages = 10;

  const { updatePost, selectedWorkers, setSelectedWorkers } =
    useHousePostStore();

  useEffect(() => {
    if (location.state) {
      const { post, isEditMode } = location.state;
      setTitle(post.title);
      setBoardContent(post.boardContent);
      setImages(post.images.map((img: any) => img.saveFile) || []);
      setSelectedWorkers(post.selectedWorkers || []);
      setIsEditMode(isEditMode);
      setPostId(post.boardSerial);
    }
    fetchWorkerInfoList();
  }, [location.state, setSelectedWorkers]);

  const fetchWorkerInfoList = async () => {
    try {
      const response = await axios.get('/api/workerlist/portfolios');
      if (response.data.proc.code === 200) {
        setWorkerInfoList(response.data.data);
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
    if (!boardContent) newErrors.boardContent = '내용이 입력되지 않았습니다';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const postData = {
      title,
      board_content: boardContent,
      selectedWorkers: selectedWorkers.map((worker) => ({
        portfolio_serial: worker.portfolio_serial,
        worker: worker.worker,
      })),
    };

    const token = `Bearer ${localStorage.getItem('token')}`;

    try {
      if (isEditMode && postId) {
        const { code, message } = await updatePost(token, postId, postData);
        if (code === 200) {
          alert('자랑글이 성공적으로 수정되었습니다.');
          navigate('/housepost', {
            state: { updatedWorkers: selectedWorkers },
          });
        } else {
          alert(`자랑글 수정에 실패했습니다: ${message}`);
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
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
    const cleanedWorkers = tempSelectedWorkers.map((worker) => ({
      ...worker,
      worker: 0,
      user_name: '김현태',
      temperature: 36.5,
    }));
    setSelectedWorkers(cleanedWorkers);
    setIsWorkerModalOpen(false);
  };

  return (
    <>
      <div className="flex items-start justify-center min-h-screen p-6">
        <div className="w-full">
          <div className="flex items-center justify-between w-full mt-12">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
              />
            </div>
            <div className="relative flex-1 font-bold text-center right-4 text-zp-2xl">
              자랑하기
            </div>
          </div>

          <div className="flex items-center justify-start mt-6 font-bold">
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
                  className="flex items-center justify-center w-24 h-24 p-2 border cursor-pointer bg-zp-white border-zp-light-gray rounded-zp-radius-btn"
                >
                  <FaCamera size={36} className="" />
                  <div className="absolute flex justify-center w-full font-bold bottom-2 text-zp-xs text-zp-gray">
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
            <div className="flex flex-1 space-x-4 overflow-x-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 flex-shrink-0 ${
                    index === 0 ? 'ml-4' : ''
                  }`}
                >
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full rounded-zp-radius-btn"
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                  >
                    <MdClose size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-6 font-bold">
            <div className="w-full text-left">
              <div className="mb-2">제목</div>
              <div className="pl-2 border bg-zp-white border-zp-light-gray rounded-zp-radius-btn">
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
                <div className="mt-1 text-zp-red text-zp-xs">
                  {errors.title}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-6 font-bold">
            <div className="w-full text-left">
              <div className="mb-2">자랑해주세요</div>
              <div className="pl-2 border bg-zp-white border-zp-light-gray rounded-zp-radius-btn">
                <Input
                  type="text"
                  placeholder="집에서 자랑하고 싶은 내용을 입력해주세요."
                  inputType="textArea"
                  width="100%"
                  height={10}
                  className=""
                  fontSize="xs"
                  radius="btn"
                  value={boardContent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBoardContent(e.target.value)
                  }
                />
              </div>
              {errors.boardContent && (
                <div className="mt-1 text-zp-red text-zp-xs">
                  {errors.boardContent}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-6 font-bold">
            <div className="w-full text-left">
              <div className="">함께한 시공업자들</div>
              <div className="text-zp-xs text-zp-light-gray">
                + 버튼을 클릭하여 함께한 시공업자들을 추가해주세요
              </div>
              <div className="flex justify-center py-24">
                <CiCirclePlus
                  style={{ color: 'gray' }}
                  size={40}
                  onClick={() => setIsWorkerModalOpen(true)}
                  className="cursor-pointer"
                />
              </div>
              {selectedWorkers.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* {selectedWorkers.map((worker) => (
                    <WorkerInfoListItem
                      key={worker.portfolio_serial}
                      worker={{
                        ...worker,
                        name: worker.user_name || '',
                        temperature: worker.temperature || 0,
                      }}
                    />
                  ))} */}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center h-20 mt-6 mb-12 font-bold">
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

      {isWorkerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-opacity-50 bg-zp-black">
          <div className="w-3/4 p-6 bg-zp-white rounded-zp-radius-big">
            <div className="flex items-center justify-between mb-4">
              <h2 className="absolute font-bold transform -translate-x-1/2 left-1/2 text-zp-xl">
                시공업자 선택
              </h2>
            </div>

            <div className="mt-6 font-bold">
              시공업자의 이름을 검색하여 추가하고 확인 버튼을 눌러주세요
            </div>

            <div className="relative flex items-center justify-center mt-6 font-bold">
              <Input
                type="text"
                placeholder="시공업자의 이름을 입력해주세요"
                inputType="textArea"
                width="14rem"
                height={2.375}
                className="pr-10 mb-4"
                fontSize="xs"
                radius="btn"
                onChange={() => {}}
              />
              <HiMagnifyingGlass className="absolute transform -translate-y-1/2 right-2 top-1/2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2 overflow-y-auto max-h-96">
              {workerInfoList.map((worker) => (
                <div key={worker.portfolio_serial} className="relative">
                  <WorkerInfoListItem worker={worker} />
                  <div
                    className="absolute cursor-pointer top-2 right-2"
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

            <div className="flex justify-center mt-6 space-x-2">
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
