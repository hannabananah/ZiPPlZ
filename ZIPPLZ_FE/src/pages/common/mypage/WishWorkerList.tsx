import { useState } from 'react';
import { FaRegCircle, FaRegCircleCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Selectbar from '@/components/common/Selectbar';
import FieldListItem from '@/components/home/FieldListItem';
import WorkerCard from '@/components/home/WorkerCard';
import Input from '@components/common/Input';

type SortOption = '평점순' | '최신순' | '과거순';

const fields: string[] = [
  '전체',
  '철거',
  '설비',
  '샷시',
  '목공',
  '전기',
  '욕실',
  '타일',
  '마루',
  '도배',
  '가구',
  '기타',
];

// 더미 데이터
export interface HotWorker {
  name: string;
  region: string;
  field: string;
  temp: string;
}
const list: HotWorker[] = [
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
];

export default function WishWorkerList() {
  const options: SortOption[] = ['평점순', '최신순', '과거순'];
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);

  const handleSortSelect = (sortOption: string) => {
    console.log(`Selected sort option: ${sortOption}`);
    setSelectedValue(sortOption as SortOption);
  };

  const handleGoBack = () => {
    navigate('/mypage');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const toggleAllSelected = () => {
    if (isAllSelected) {
      setSelectedWorkers([]);
    } else {
      setSelectedWorkers(list.map((_, index) => index));
    }
    setIsAllSelected(!isAllSelected);
  };

  const toggleSelecting = () => {
    setIsSelecting(!isSelecting);
    setSelectedWorkers([]);
    setIsAllSelected(false);
  };

  const handleWorkerSelect = (index: number) => {
    if (selectedWorkers.includes(index)) {
      setSelectedWorkers(selectedWorkers.filter((i) => i !== index));
    } else {
      setSelectedWorkers([...selectedWorkers, index]);
    }
  };

  const handleModalConfirm = () => {
    // 선택된 Worker 삭제 로직
    setSelectedWorkers([]);
    setIsSelecting(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col w-full items-start min-h-screen px-6 gap-4 mb-6">
        {/* 뒤로가기 버튼 + "내가 쓴 글 목록" 글자 */}
        <div className="mt-20 h-10 flex items-center justify-between w-full relative">
          <div className="flex w-full items-center justify-center gap-2">
            <GoArrowLeft
              className="absolute left-0 cursor-pointer"
              onClick={handleGoBack}
              size={20}
            />
            {/* 관심 있는 시공업자 text */}
            <div className="flex items-center space-x-2">
              <div className="text-zp-lg font-bold">관심 있는 시공업자</div>
            </div>
          </div>
        </div>

        {/* 공종이 이미지로 표시됨 */}
        <div className="grid w-full grid-cols-6 gap-4">
          {fields.map((item, index) => (
            <FieldListItem key={index} field={item} />
          ))}
        </div>

        {/* 검색 input */}
        <div className="w-full relative flex justify-center items-center">
          <HiMagnifyingGlass className="absolute left-[1rem]" />
          <Input
            type="text"
            placeholder="검색어를 입력해주세요."
            inputType="search"
            width="full"
            height={2}
            className="pl-8"
            fontSize="sm"
            radius="big"
          />
          <IoIosClose
            size={30}
            className="absolute right-[7rem] cursor-pointer"
          />
          {/* 정렬 버튼 셀렉트바 */}
          <div className="relative top-3 left-3 flex justify-end items-center">
            <div>
              <Selectbar
                backgroundColor="none"
                fontColor="black"
                options={options}
                selectedValue={selectedValue}
                setSelectedValue={handleSortSelect}
                width={6}
                height={2.5}
                fontSize="xs"
                radius="btn"
                border="none"
                hover="light-gray"
              />
            </div>
          </div>
        </div>
        {/* 전체 게시글 수 표시 부분 */}
        <div className="text-zp-xl font-bold text-zp-gray">
          <div>전체 {list.length}</div>
        </div>
        {/* 선택하기-삭제하기 버튼 */}
        <div className="w-full flex justify-between items-center text-zp-2xs">
          {isSelecting && (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleAllSelected}
            >
              {isAllSelected ? (
                <FaRegCircleCheck size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              <span>전체 선택</span>
            </div>
          )}
          <button
            className="rounded-zp-radius-big p-2 px-3 bg-zp-light-gray flex items-center space-x-2 ml-auto"
            onClick={() => {
              if (isSelecting && selectedWorkers.length === 0) {
                toggleSelecting();
              } else if (isSelecting && selectedWorkers.length > 0) {
                setIsModalOpen(true);
              } else {
                toggleSelecting();
              }
            }}
          >
            {isSelecting ? (
              selectedWorkers.length === 0 ? (
                <span>삭제 취소</span>
              ) : (
                <>
                  <IoIosClose size={14} />
                  <span>선택 삭제</span>
                </>
              )
            ) : (
              <span>선택하기</span>
            )}
          </button>
        </div>
        {/* 가로선 */}
        <hr className="w-full border-zp-main-color" />

        {/* WorkerCard 컴포넌트 */}
        <div className="w-full mt-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {list.map((worker, index) => (
            <div
              key={index}
              className={`relative rounded-zp-radius-big border border-zp-light-beige shadow-lg flex flex-col items-center ${
                selectedWorkers.includes(index) ? 'bg-zp-light-gray' : ''
              }`}
              onClick={() => handleWorkerSelect(index)}
            >
              {isSelecting && (
                <div className="absolute top-6 right-2 z-10">
                  {selectedWorkers.includes(index) ? (
                    <FaRegCircleCheck size={20} />
                  ) : (
                    <FaRegCircle size={20} />
                  )}
                </div>
              )}
              <WorkerCard worker={worker} />
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-zp-white rounded-zp-radius-big p-6">
            <div className="text-zp-2xl font-bold mb-4">삭제 확인</div>
            <div className="mb-4 font-bold">
              선택한 항목을 삭제하시겠습니까?
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="w-full font-bold px-4 py-2 bg-zp-light-beige rounded-zp-radius-big"
                onClick={handleModalCancel}
              >
                취소
              </button>
              <button
                className="w-full font-bold px-4 py-2 bg-zp-sub-color rounded-zp-radius-big"
                onClick={handleModalConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
