import { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaSortAmountDown,
} from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from '@/components/common/Input';
import Selectbar from '@/components/common/Selectbar';
import FindWorkerListItem from '@/components/worker/FindWorkerListItem';

export default function WorkerInfoList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const newPost = location.state?.newPost;

  const handleWritePost = () => {
    navigate('/FindWorkerDetail'); // FindWorkerDetail 페이지로 이동
  };

  const handleInputClick = () => {
    navigate('/WorkerInfoLocationDetail'); // 클릭 시 이동할 페이지
  };

  const handleInputClick2 = () => {
    navigate('/WorkerInfoDateDetail'); // 클릭 시 이동할 페이지
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortSelect = (sortOption) => {
    console.log(`Selected sort option: ${sortOption}`);
    setIsSortDropdownOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsDropdownOpen(false); // 드롭다운을 닫습니다.
  };

  const [selectedValue, setSelectedValue] = useState('정렬');
  const options = ['평점순', '최신순', '과거순'];
  const options2 = ['전문 시공자 둘러보기', '전문 시공자 구하기'];

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* 드롭다운 버튼 */}
          <div className="relative flex justify-center items-center">
            <div
              onClick={toggleDropdown}
              className="cursor-pointer flex items-center space-x-2"
            >
              <div className="w-64 h-6 font-bold text-zp-lg text-zp-black flex justify-center">
                전문 시공자 둘러보기
              </div>
              <IoMdArrowDropdown
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                size={24}
              />
            </div>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-64 bg-zp-white border border-gray-200 shadow-lg rounded-lg z-50">
                <button
                  onClick={() => handleNavigate('/WorkerInfoList')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  전문 시공자 둘러보기
                </button>
                <button
                  onClick={() => handleNavigate('/FindWorkerList')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  전문 시공자 구하기
                </button>
              </div>
            )}
          </div>

          {/* 공종 선택 버튼 리스트 임시로 만듦 */}
          <div className="flex justify-center">
            <div>공종 선택 버튼 리스트</div>
          </div>

          <div className="w-64 h-6 text-zp-lg font-bold text-zp-black">
            계획 중인 시공이 있으신가요?
          </div>

          {/* 위치 및 날짜 입력 */}
          {/* 위치 input  */}
          {/* 시공 날짜 input  */}
          <div className="flex justify-center space-x-4 my-4">
            <div className="relative flex items-center space-x-2">
              <FaMapMarkerAlt
                className="absolute left-4 text-zp-sub-color"
                size={20}
              />
              <div>
                <Input
                  placeholder="인천 계양구, 인천 부평구 외 2개"
                  inputType="search"
                  type="search"
                  width={16.875}
                  height={2.5}
                  fontSize="xs"
                  radius="btn"
                  value={inputValue}
                  onClick={handleInputClick}
                  additionalStyle="pl-8 bg-zp-light-beige border-b-2 font-bold border-zp-sub-color"
                />
              </div>
            </div>
            <div className="relative flex items-center space-x-2">
              <FaRegCalendarAlt
                className="absolute left-4 text-zp-sub-color"
                size={20}
              />
              <div>
                <Input
                  placeholder="시공 날짜 선택"
                  inputType="search"
                  type="search"
                  width={16.875}
                  height={2.5}
                  fontSize="xs"
                  radius="btn"
                  value={inputValue}
                  onClick={handleInputClick2}
                  additionalStyle="pl-8 bg-zp-light-beige border-b-2 font-bold border-zp-sub-color"
                />
              </div>
            </div>
          </div>

          {/* 정렬 버튼 */}

          <div className="relative flex justify-end">
            <FaSortAmountDown />
            <div>
              <Selectbar
                backgroundColor="none"
                fontColor="black"
                options={options}
                selectedValue="정렬"
                setSelectedValue={setSelectedValue}
                width={5}
                height={2.5}
                fontSize="xs"
                radius="btn"
                border="none"
                hover="light-gray"
              />
            </div>
          </div>

          {/* 시공업자의 이름을 입력하세요. */}
          {/* 검색 입력 필드 */}
          <div className="flex justify-center items-center space-x-2 my-4">
            <HiMagnifyingGlass />
            <Input
              placeholder="시공업자의 이름을 입력하세요"
              inputType="normal"
              type="text"
              width={12}
              height={2.5}
              fontSize="xs"
              radius="btn"
              value={inputValue}
              onChange={handleInputChange}
              additionalStyle="bg-zp-light-beige font-bold border-zp-sub-color text-zp-gray"
            />
          </div>

          {/* 시공업자 정보 컴포넌트(줄당 3개) */}
          {/* 컴포넌트 클릭 시 시공업자 상세 페이지로 이동되게 코드 수정 필요 */}

          <div className="grid grid-cols-3 gap-3">
            {/* 임시로 하드 코딩 */}
            <FindWorkerListItem />
            <FindWorkerListItem />
            <FindWorkerListItem />
            <FindWorkerListItem />
          </div>

          {/* 해당되는 시공업자가 없으면 관련 이미지 표시 */}
          {/* 무한스크롤 */}
        </div>
      </div>
    </>
  );
}
