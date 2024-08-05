import { useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircle, FaRegCircleDot } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoIosClose } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Selectbar from '@/components/common/Selectbar';
import WorkerCard from '@/components/home/WorkerCard';
import Input from '@components/common/Input';

type SortOption = '평점순' | '최신순' | '과거순';

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

export default function MyBoardList() {
  const options: SortOption[] = ['평점순', '최신순', '과거순'];
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSortSelect = (sortOption: string) => {
    console.log(`Selected sort option: ${sortOption}`);
    setSelectedValue(sortOption as SortOption);
  };

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/mypage');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false); // 드롭다운을 닫습니다.
  };

  const toggleSelecting = () => {
    setIsSelecting(!isSelecting);
  };

  const toggleAllSelected = () => {
    setIsAllSelected(!isAllSelected);
  };

  return (
    <>
      <div className="flex flex-col w-full items-start min-h-screen px-6 gap-4 mb-6">
        {/* 뒤로가기 버튼 + "내가 쓴 글 목록" 글자 */}
        <div className="h-10 flex items-center justify-between w-full relative">
          <div className="flex w-full items-center justify-center gap-2">
            <GoArrowLeft
              className="absolute left-0 cursor-pointer"
              onClick={handleGoBack}
              size={20} // 아이콘 크기 조정
            />
            <div className="flex items-center space-x-2">
              <span className="text-zp-lg font-bold">내가 쓴 글 목록</span>
              <div
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center space-x-2"
              >
                <IoMdArrowDropdown
                  className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  size={24}
                />
              </div>
            </div>
          </div>
          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-zp-white border border-gray-200 shadow-lg rounded-lg z-50">
              <button
                onClick={() => handleNavigate('/mypage/myscraplist')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                스크랩 글 목록
              </button>
              <button
                onClick={() => handleNavigate('/mypage/myboardlist')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                내가 쓴 글 목록
              </button>
            </div>
          )}
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
          {/* 정렬 버튼 셀렉트바*/}
          <div className="relative flex justify-end items-center">
            <FaSortAmountDown />
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
        <div className="text-zp-xl font-bold text-zp-gray">전체 3</div>
        {/* 선택하기-삭제하기 버튼 */}
        <div className="w-full flex justify-between items-center text-zp-2xs">
          {isSelecting && (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleAllSelected}
            >
              {isAllSelected ? (
                <FaRegCircleDot size={20} />
              ) : (
                <FaRegCircle size={20} />
              )}
              <span>전체 선택</span>
            </div>
          )}
          <button
            className="rounded-zp-radius-big p-2 px-3 bg-zp-light-gray flex items-center space-x-2"
            onClick={toggleSelecting}
          >
            {isSelecting ? (
              <>
                <IoIosClose size={20} />
                <span>선택 삭제</span>
              </>
            ) : (
              <span>선택하기</span>
            )}
          </button>
        </div>
        {/* 가로선 */}
        <hr className="w-full border-zp-main-color" />

        {/* workerInfoListitem 컴포넌트 */}
        <div className="w-full mt-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {list.map((worker, index) => (
            <WorkerCard key={index} worker={worker} />
          ))}
        </div>
      </div>
    </>
  );
}
