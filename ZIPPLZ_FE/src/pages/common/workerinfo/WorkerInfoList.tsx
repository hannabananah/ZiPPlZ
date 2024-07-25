import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaSortAmountDown,
} from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

export default function WorkerInfoList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const newPost = location.state?.newPost;

  const handleWritePost = () => {
    navigate('/FindWorkerDetail'); // FindWorkerDetail 페이지로 이동
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

  return (
    <>
      {/* 드롭다운 버튼 */}
      <div className="relative flex justify-center items-center">
        <div
          onClick={toggleDropdown}
          className="cursor-pointer flex items-center space-x-2"
        >
          <div className="w-64 h-6 text-zp-lg text-zp-black">
            전문 시공자 둘러보기
          </div>
          <IoMdArrowDropdown
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            size={24}
          />
        </div>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
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

      <div>공종 선택 버튼 리스트</div>

      <div className="w-64 h-6 text-zp-lg text-zp-black">
        계획 중인 시공이 있으신가요?
      </div>

      {/* 위치 및 날짜 입력 */}
      {/* 위치 input  */}
      {/* 시공 날짜 input  */}
      <div className="flex justify-center space-x-4 my-4">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt />
          <input
            className="border-b-2 border-zp-sub-color outline-none p-2"
            type="text"
            name="location"
            placeholder="인천 계양구, 인천 부평구 외 2개"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaRegCalendarAlt />
          <input
            className="border-b-2 border-zp-sub-color outline-none p-2"
            type="text"
            name="workDateSelect"
            placeholder="시공 날짜 선택"
          />
        </div>
      </div>

      {/* 정렬 버튼 */}
      <div className="relative flex justify-end">
        <button
          className="w-18 h-12 flex items-center space-x-2"
          onClick={toggleSortDropdown}
        >
          <FaSortAmountDown />
          <span>정렬</span>
        </button>
        {isSortDropdownOpen && (
          <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
            <button
              onClick={() => handleSortSelect('평점순')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              평점순
            </button>
            <button
              onClick={() => handleSortSelect('최신순')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              최신순
            </button>
            <button
              onClick={() => handleSortSelect('과거순')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              과거순
            </button>
          </div>
        )}
      </div>

      {/* 시공업자의 이름을 입력하세요. */}
      {/* 검색 입력 필드 */}
      <div className="flex justify-center items-center space-x-2 my-4">
        <HiMagnifyingGlass />
        <input
          className="border-b-2 border-zp-sub-color outline-none p-2"
          type="text"
          name="input"
          placeholder="시공업자의 이름을 입력하세요"
        />
      </div>

      {/* 시공업자 정보 컴포넌트(줄당 1개) */}
      {/* 해당되는 시공업자가 없으면 관련 이미지 표시 */}
      {/* 무한스크롤 */}
      {/* Bottom-tab */}
    </>
  );
}
