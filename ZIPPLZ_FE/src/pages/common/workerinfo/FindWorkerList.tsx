import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaSortAmountDown,
} from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FindWorkerList() {
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
            전문 시공자 구하기
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

      {/* 위치 및 날짜 입력 */}
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

      {/* 검색 입력 필드 */}
      <div className="flex justify-center items-center space-x-2 my-4">
        <HiMagnifyingGlass />
        <input
          className="border-b-2 border-zp-sub-color outline-none p-2"
          type="text"
          name="input"
          placeholder="글의 제목이나 작성자 이름을 입력하세요"
        />
      </div>

      {/* 글 작성하기 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleWritePost}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          글 작성하기
        </button>
      </div>

      {/* 새로운 포스트 정보 표시 */}
      {newPost && (
        <div className="p-4 bg-zp-light-beige rounded-zp-radius-big">
          <h2 className="font-['nanum'] text-zp-lg font-bold">
            {newPost.title}
          </h2>
          <p className="text-zp-xs">현장 주소: {newPost.address}</p>
          <p className="text-zp-xs">상세 주소: {newPost.addressDetail}</p>
          <p className="text-zp-xs">작업 내용: {newPost.workDetail}</p>
        </div>
      )}

      {/* 나중에 추가할 요소들 */}
      {/* 1줄에 글 1개 */}
      {/* 글 제목, 글 내용, 닉네임, 작업희망 날짜, 위치 표시 */}
      {/* 해당되는 구인글 없으면 관련 이미지 표시 */}
      {/* 무한스크롤 */}
      {/* Bottom-tab */}
    </>
  );
}
