import { useEffect, useState } from 'react';
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaSortAmountDown,
} from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

import { getPortfolio } from '@/apis/worker/PortfolioApi';
// import Button from '@/components/common/Button';
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
export interface WorkerInfo {
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
export default function WorkerInfoList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const newPost = (location.state as LocationState)?.newPost;
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [inputValue, setInputValue] = useState<string>('');
  const [workerList, setWorkerList] = useState<WorkerInfo[]>([]);
  const [isListExist, setIsListExist] = useState(false);
  const [, setError] = useState<string | null>(null); // error 변수 안 쓰여서 우선 지움

  const handleInputClick = () => {
    navigate('/WorkerInfoLocationDetail'); // 클릭 시 이동할 페이지
  };

  const handleInputClick2 = () => {
    navigate('/WorkerInfoDateDetail'); // 클릭 시 이동할 페이지
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 시공자 포트폴리오 정보 가져오기
  const fetchWorkerData = async () => {
    try {
      const response = await getPortfolio();
      console.log(response);
      setWorkerList(response.data.data);
    } catch (error) {
      setError(null);
    }
  };
  useEffect(() => {
    fetchWorkerData();
  }, []);
  useEffect(() => {
    if (workerList.length > 0) {
      setIsListExist(true);
    } else {
      setIsListExist(false);
    }
  }, [workerList]);

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
    <div className="flex items-start justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full">
        {/* 드롭다운 버튼 */}
        <div className="relative flex items-center justify-center">
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="flex justify-center w-64 h-6 font-bold text-zp-lg text-zp-black">
              전문 시공자 둘러보기
            </div>
            <IoMdArrowDropdown
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              size={24}
            />
          </div>

          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <div className="absolute z-50 w-64 mt-2 border border-gray-200 rounded-lg shadow-lg top-full bg-zp-white">
              <button
                onClick={() => handleNavigate('/WorkerInfoList')}
                className="block w-full px-4 py-2 text-left hover:bg-zp-gray"
              >
                전문 시공자 둘러보기
              </button>
              <button
                onClick={() => handleNavigate('/FindWorkerList')}
                className="block w-full px-4 py-2 text-left hover:bg-zp-gray"
              >
                전문 시공자 구하기
              </button>
            </div>
          )}
        </div>

        {/* 공종 선택 버튼 리스트 임시로 만듦 */}
        <div className="flex justify-center mt-2">
          <div>공종 선택 버튼 리스트</div>
        </div>

        <div className="w-64 h-6 font-bold text-zp-lg text-zp-black">
          계획 중인 시공이 있으신가요?
        </div>

        {/* 위치 및 날짜 입력 */}
        <div className="flex justify-center my-4 space-x-4">
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
                width="full"
                height={2.5}
                fontSize="xs"
                radius="btn"
                value={inputValue}
                onClick={handleInputClick}
                onChange={handleInputChange} // `onChange` 핸들러 추가
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
                width="full"
                height={2.5}
                fontSize="xs"
                radius="btn"
                value={inputValue}
                onClick={handleInputClick2}
                onChange={handleInputChange} // `onChange` 핸들러 추가
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
        <div className="flex items-center justify-center my-4 space-x-2">
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
            onChange={handleInputChange} // `onChange` 핸들러 추가
            additionalStyle="bg-zp-light-beige font-bold border-zp-sub-color text-zp-gray"
          />
        </div>

        <div className="grid flex-col w-full grid-cols-3 gap-3">
          {/* 임시로 하드 코딩 */}
          {/* backend 유저 정보 데이터 받고나서 수정 예정 */}
          {isListExist &&
            workerList.map((worker) => <WorkerInfoListItem worker={worker} />)}
        </div>

        {/* 새로운 포스트 정보 표시 */}
        {newPost && (
          <div className="p-4 bg-zp-light-beige rounded-zp-radius-big">
            <h2 className="font-bold text-zp-lg">{newPost.title}</h2>
            <p className="text-zp-xs">현장 주소: {newPost.address}</p>
            <p className="text-zp-xs">상세 주소: {newPost.addressDetail}</p>
            <p className="text-zp-xs">작업 내용: {newPost.workDetail}</p>
          </div>
        )}

        {/* 나중에 추가할 요소들 */}
        {/* 글 제목, 글 내용, 닉네임, 작업희망 날짜, 위치 연동 됐는데 CSS 깨짐*/}
        {/* 클릭 시 글 상세 페이지로 이동 */}
        {/* 해당되는 구인글 없으면 "게시물이 없습니다" 이미지 표시 */}
        {/* 게시물 개수를 확인하는 변수를 만들고, 개수가 0이면 "게시물이 없습니다" 이미지 띄우기 */}
      </div>
    </div>
  );
}
