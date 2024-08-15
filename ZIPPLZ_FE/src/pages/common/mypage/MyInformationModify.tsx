import { useEffect, useState } from 'react';
import { FaRegCircle, FaRegCircleCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoIosClose, IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import FindWorkerListItem from '@/components/worker/findworker/FindWorkerListItem';
import Input from '@components/common/Input';
import Selectbar from '@components/common/Selectbar';
import { useMyPageStore } from '@stores/myPageStore';

export interface WorkerInfo {
  board_serial: number;
  board_type: number;
  user_serial: number;
  title: string;
  board_content: string;
  board_date: string;
  hit: number;
  nickname: string;
  comment_cnt: number;
  wish_cnt: number;
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
  user_name: string; // 추가된 부분
}

type SortOption = '평점순' | '최신순' | '과거순';

export default function MyFindWorkerList() {
  const options: SortOption[] = ['평점순', '최신순', '과거순'];
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);
  const [workerList, setWorkerList] = useState<WorkerInfo[]>([]);

  const { fetchMyFindWorkerList } = useMyPageStore();

  interface WorkerPost {
    board_serial: number;
    board_type: number;
    user_serial: number;
    title: string;
    board_content: string;
    board_date: string;
    hit: number;
    nickname: string;
    comment_cnt: number;
    wish_cnt: number;
    portfolio_serial?: number; // 선택적 속성으로 정의
    name?: string;
    birth_date?: number;
    temp?: number;
    field_id?: number;
    field_name?: string;
    career?: number;
    certificated_badge?: number;
    locations?: string[];
    img?: string;
    user_name?: string; // 선택적 속성으로 정의
  }

  useEffect(() => {
    const loadWorkers = async () => {
      const workers: WorkerPost[] = await fetchMyFindWorkerList();

      // WorkerPost 객체를 WorkerInfo 타입으로 변환
      const workerInfoList: WorkerInfo[] = workers.map((worker) => ({
        board_serial: worker.board_serial,
        board_type: worker.board_type,
        user_serial: worker.user_serial,
        title: worker.title,
        board_content: worker.board_content,
        board_date: worker.board_date,
        hit: worker.hit,
        nickname: worker.nickname,
        comment_cnt: worker.comment_cnt,
        wish_cnt: worker.wish_cnt,
        portfolio_serial: worker.portfolio_serial || 0, // 기본값 설정
        name: worker.name || '', // 기본값 설정
        birth_date: worker.birth_date || 0, // 기본값 설정
        temp: worker.temp || 0, // 기본값 설정
        field_id: worker.field_id || 0, // 기본값 설정
        field_name: worker.field_name || '', // 기본값 설정
        career: worker.career || 0, // 기본값 설정
        certificated_badge: worker.certificated_badge || 0, // 기본값 설정
        locations: worker.locations || [], // 기본값 설정
        img: worker.img || '', // 기본값 설정
        user_name: worker.user_name || '', // user_name 추가
      }));

      setWorkerList(workerInfoList);
    };

    loadWorkers();
  }, [fetchMyFindWorkerList]);

  const handleGoBack = () => {
    navigate('/mypage');
  };

  const handleSortSelect = (sortOption: string) => {
    setSelectedValue(sortOption as SortOption);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAllSelected = () => {
    if (isAllSelected) {
      setSelectedWorkers([]);
    } else {
      setSelectedWorkers(workerList.map((worker) => worker.user_serial));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleWorkerSelect = (user_serial: number) => {
    if (selectedWorkers.includes(user_serial)) {
      setSelectedWorkers(selectedWorkers.filter((id) => id !== user_serial));
    } else {
      setSelectedWorkers([...selectedWorkers, user_serial]);
    }
  };

  const toggleSelecting = () => {
    if (isSelecting) {
      setSelectedWorkers([]);
    }
    setIsSelecting(!isSelecting);
    setIsAllSelected(false);
  };

  const handleDeleteConfirmation = () => {
    setIsModalOpen(true);
  };

  const handleWorkerClick = (user_serial: number) => {
    navigate(`/workers/findworker/${user_serial}`);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false); // 드롭다운을 닫습니다.
  };

  return (
    <>
      <div className="flex flex-col w-full items-start min-h-screen px-6 gap-4 mb-6">
        <div className="mt-16 h-10 flex items-center justify-between w-full relative">
          <div className="flex w-full items-center justify-center gap-2">
            <GoArrowLeft
              className="absolute left-0 cursor-pointer"
              onClick={handleGoBack}
              size={20}
            />
            <div className="flex items-center space-x-2">
              <span className="text-zp-lg font-bold">내가 쓴 글 목록</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 w-full relative">
          <span className="text-zp-lg font-bold">시공자 구하기</span>
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2"
          >
            <IoMdArrowDropdown
              className={`transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              size={24}
            />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-zp-white border border-zp-light-gray shadow-lg rounded-zp-radius-big z-50">
              <button
                onClick={() => handleNavigate('/mypage/MyFindWorkerList')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-bold text-zp-sm hover:bg-zp-light-beige rounded-zp-radius-big"
              >
                시공자 구하기
              </button>
              <button
                onClick={() => handleNavigate('/mypage/MyHousePostList')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-bold text-zp-sm hover:bg-zp-light-beige rounded-zp-radius-big"
              >
                집들이
              </button>
              <button
                onClick={() => handleNavigate('/mypage/MyQuestionPostList')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-bold text-zp-sm hover:bg-zp-light-beige rounded-zp-radius-big"
              >
                질문글
              </button>
            </div>
          )}
        </div>

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
          <div className="relative top-3 flex justify-end items-center">
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
                hover="main"
              />
            </div>
          </div>
        </div>

        <div className="text-zp-xl font-bold text-zp-gray">
          전체 {workerList.length}
        </div>

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
          <div className="ml-auto">
            <button
              className="rounded-zp-radius-big p-2 px-3 bg-zp-light-gray flex items-center space-x-2"
              onClick={
                isSelecting && selectedWorkers.length > 0
                  ? handleDeleteConfirmation
                  : toggleSelecting
              }
            >
              {isSelecting ? (
                selectedWorkers.length === 0 ? (
                  <span>선택 취소</span>
                ) : (
                  <>
                    <IoIosClose size={14} />
                    <span>삭제</span>
                  </>
                )
              ) : (
                <span>선택하기</span>
              )}
            </button>
          </div>
        </div>

        <hr className="w-full border-zp-main-color" />

        <div className="w-full mt-2 grid grid-cols-1 gap-4">
          {workerList.map((worker) => (
            <div
              key={worker.board_serial} // board_serial을 key로 사용
              className={`relative rounded-zp-radius-big border border-zp-light-beige shadow-lg flex flex-col items-center ${
                selectedWorkers.includes(worker.user_serial)
                  ? 'bg-zp-light-gray'
                  : ''
              }`}
            >
              {isSelecting && (
                <div
                  className="absolute top-2 right-2 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkerSelect(worker.user_serial);
                  }}
                >
                  {selectedWorkers.includes(worker.user_serial) ? (
                    <FaRegCircleCheck />
                  ) : (
                    <FaRegCircle />
                  )}
                </div>
              )}
              <div
                className={`w-full h-full ${
                  isSelecting ? 'pointer-events-none' : ''
                }`}
                onClick={() => handleWorkerClick(worker.board_serial)}
              >
                <FindWorkerListItem board={worker} />
              </div>
            </div>
          ))}
        </div>
      </div>

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
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="w-full font-bold px-4 py-2 bg-zp-sub-color rounded-zp-radius-big"
                onClick={() => {
                  setSelectedWorkers([]);
                  setIsSelecting(false);
                  setIsModalOpen(false);
                }}
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
