import { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaSortAmountDown,
} from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@components/common/Input';
import Selectbar from '@components/common/Selectbar';
import WorkerInfoListItem from '@components/worker/WorkerInfoListItem';

// newPost의 타입을 정의합니다.
interface LocationState {
  newPost?: {
    title: string;
    address: string;
    addressDetail: string;
    workDetail: string;
  };
}

export default function FindWorkerList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const newPost = (location.state as LocationState)?.newPost;
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [inputValue, setInputValue] = useState<string>('');

  const handleWritePost = () => {
    navigate('/FindWorkerDetailCreate'); // FindWorkerDetail 페이지로 이동
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

  // 정렬 옵션의 타입을 정의합니다.
  type SortOption = '평점순' | '최신순' | '과거순';

  const handleSortSelect = (sortOption: string) => {
    // 수정된 부분
    console.log(`Selected sort option: ${sortOption}`);
    setSelectedValue(sortOption as SortOption); // 타입 강제 변환
    setIsSortDropdownOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false); // 드롭다운을 닫습니다.
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const options: SortOption[] = ['평점순', '최신순', '과거순'];
  console.log(isSortDropdownOpen);
  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
      <div className="w-full">
        {/* 드롭다운 버튼 */}
        <div className="relative flex justify-center items-center">
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2"
          >
            <div className="font-bold text-zp-lg text-zp-black text-center">
              전문 시공자 구하기
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

        {/* 위치 및 날짜 입력 */}
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
                width={10}
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
                width={10}
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

        {/* 검색 입력 필드 */}
        <div className="flex justify-center items-center space-x-2 my-4">
          <HiMagnifyingGlass />
          <Input
            placeholder="글의 제목이나 작성자 이름을 입력하세요"
            inputType="normal"
            type="text"
            width={15}
            height={2.5}
            fontSize="xs"
            radius="btn"
            value={inputValue}
            onChange={handleInputChange}
            additionalStyle="bg-zp-light-beige font-bold border-zp-sub-color text-zp-gray"
          />
        </div>

        {/* 글 작성하기 버튼 */}
        <div className="flex justify-end mb-4">
          <div className="w-18 px-4 text-zp-2xs py-2 rounded-zp-radius-btn border border-zp-main-color bg-white text-center">
            <Button
              children="글 작성하기"
              buttonType="light"
              width={3.5}
              height={1}
              fontSize="2xs"
              radius="btn"
              onClick={handleWritePost}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          {/* 임시로 하드 코딩 */}
          {/* backend 유저 정보 데이터 받고나서 수정 예정 */}
          <WorkerInfoListItem />
          <WorkerInfoListItem />
          <WorkerInfoListItem />
          <WorkerInfoListItem />
        </div>

        {/* 새로운 포스트 정보 표시 */}
        {newPost && (
          <div className="p-4 bg-zp-light-beige rounded-zp-radius-big">
            <h2 className="text-zp-lg font-bold">{newPost.title}</h2>
            <p className="text-zp-xs">현장 주소: {newPost.address}</p>
            <p className="text-zp-xs">상세 주소: {newPost.addressDetail}</p>
            <p className="text-zp-xs">작업 내용: {newPost.workDetail}</p>
          </div>
        )}

        {/* 나중에 추가할 요소들 */}
        {/* 글 제목, 글 내용, 닉네임, 작업희망 날짜, 위치 연동 */}
        {/* 클릭 시 글 상세 페이지로 이동 */}
        {/* 해당되는 구인글 없으면 "게시물이 없습니다" 이미지 표시 */}
        {/* 게시물 개수를 확인하는 변수를 만들고, 개수가 0이면 "게시물이 없습니다" 이미지 띄우기 */}
        {/* 무한스크롤 */}
      </div>
    </div>
  );
}
