import { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import HousePostListItem from '@/components/community/HousePostListItem';

import Button from '@/components/common/Button';
import Input from '@components/common/Input';
import Selectbar from '@components/common/Selectbar';

type SortOption = '평점순' | '최신순' | '과거순';

interface WorkerInfo {
  name: string;
  birth_date: string;
  temp: number;
  certificated_badge: number;
  field_name: string;
  career: number;
  img: string;
}

const dummyWorkers: WorkerInfo[] = [
  {
    name: '이가은',
    birth_date: '1999',
    temp: 36.5,
    certificated_badge: 1,
    field_name: '전기',
    career: 3,
    img: '/path/to/image1.jpg'
  },
  {
    name: '김철수',
    birth_date: '1990',
    temp: 37.0,
    certificated_badge: 0,
    field_name: '목공',
    career: 5,
    img: '/path/to/image2.jpg'
  }
  // 추가 더미 데이터
];

export default function HousePost() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [inputValue, setInputValue] = useState<string>('');

  const navigate = useNavigate();

  const handleWritePost = () => {
    navigate('/HousePostDetail'); // FindWorkerDetail 페이지로 이동
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSortSelect = (sortOption: string) => {
    console.log(`Selected sort option: ${sortOption}`);
    setSelectedValue(sortOption as SortOption);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const options: SortOption[] = ['평점순', '최신순', '과거순'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          {/* 드롭다운 버튼 */}
          <div className="mt-16 relative flex justify-center items-center">
            <div
              onClick={toggleDropdown}
              className="cursor-pointer flex items-center space-x-2"
            >
              <div className="font-bold text-zp-lg text-zp-black text-center">
                집들이
              </div>
              <IoMdArrowDropdown
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                size={24}
              />
            </div>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute top-full border border-zp-light-gray rounded-zp-radius-btn font-bold hover:bg-zp-light-beige ">
                <button
                  onClick={() => handleNavigate('/HousePost')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  집들이
                </button>
                <button
                  onClick={() => handleNavigate('/QuestionPost')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  질문글
                </button>
              </div>
            )}
          </div>
          {/* 정렬 버튼 */}
          <div className="relative left-3 flex justify-end">
            <Selectbar
              backgroundColor="none"
              fontColor="black"
              options={options}
              selectedValue={selectedValue}
              setSelectedValue={handleSortSelect}
              width={5}
              height={2}
              fontSize="xs"
              radius="btn"
              border="none"
              hover="light-gray"
            />
          </div>
          {/* 글 작성하기 버튼 */}
          <div className="flex justify-end mb-4">
            <div className="text-zp-2xs py-2 rounded-zp-radius-btn border border-zp-main-color bg-white text-center">
              <Button
                children="작성하기"
                buttonType="light"
                width={3.5}
                height={0.75}
                fontSize="2xs"
                radius="btn"
                onClick={handleWritePost}
              />
            </div>
          </div>
          {/* 시공업자의 이름을 입력하세요. */}
          <div className="w-full relative flex justify-center items-center">
            <HiMagnifyingGlass className="relative left-4" />
            <Input
              placeholder="글의 제목이나 작성자 이름을 입력하세요."
              inputType="signup"
              type="text"
              width={14}
              height={2.5}
              fontSize="2xs"
              radius="none"
              value={inputValue}
              onChange={handleInputChange}
              additionalStyle="pl-6 bg-zp-light-beige border-b-2 font-bold text-zp-gray"
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {dummyWorkers.map((worker, index) => (
              <HousePostListItem key={index} worker={worker} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}