import { useEffect, useState } from 'react';
import { FaRegCircle, FaRegCircleCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoIosClose } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Selectbar from '@/components/common/Selectbar';
import QuestionPostListItem from '@/components/community/QuestionPostListItem';
import { useMyPageStore } from '@/stores/myPageStore';
import Input from '@components/common/Input';

type SortOption = '평점순' | '최신순' | '과거순';

export default function MyQuestionPostScrapList() {
  const options: SortOption[] = ['평점순', '최신순', '과거순'];
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [list, setList] = useState<any[]>([]);

  const fetchMyQuestionPostScrapList = useMyPageStore(
    (state) => state.fetchMyQuestionPostScrapList
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMyQuestionPostScrapList();
      setList(data);
    };

    fetchData();
  }, [fetchMyQuestionPostScrapList]);

  const handleSortSelect = (sortOption: string) => {
    setSelectedValue(sortOption as SortOption);
  };

  const handleGoBack = () => {
    navigate('/mypage');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const toggleAllSelected = () => {
    if (isAllSelected) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(list.map((post) => post.board_serial));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handlePostSelect = (board_serial: number) => {
    if (selectedPosts.includes(board_serial)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== board_serial));
    } else {
      setSelectedPosts([...selectedPosts, board_serial]);
    }
  };

  const toggleSelecting = () => {
    if (isSelecting) {
      setSelectedPosts([]);
    }
    setIsSelecting(!isSelecting);
    setIsAllSelected(false);
  };

  const handleDeleteConfirmation = () => {
    setIsModalOpen(true);
  };

  const handleWorkerClick = (board_serial: number) => {
    navigate(`/questionpost/${board_serial}`);
  };

  const handleBookmarkToggle = (
    board_serial: number,
    isBookmarked: boolean
  ) => {
    if (isBookmarked) {
      setBookmarkedPosts([...bookmarkedPosts, board_serial]);
    } else {
      setBookmarkedPosts(bookmarkedPosts.filter((id) => id !== board_serial));
    }
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
              <span className="text-zp-lg font-bold">스크랩 글 목록</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 w-full relative">
          <span className="text-zp-lg font-bold">질문글</span>
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2"
          >
            <IoMdArrowDropdown
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              size={24}
            />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-zp-white border border-zp-light-gray shadow-lg rounded-zp-radius-big z-50">
              <button
                onClick={() => handleNavigate('/mypage/MyFindWorkerScrapList')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-bold text-zp-sm hover:bg-zp-light-beige rounded-zp-radius-big"
              >
                시공자 구하기
              </button>
              <button
                onClick={() => handleNavigate('/mypage/MyHousePostScrapList')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-bold text-zp-sm hover:bg-zp-light-beige rounded-zp-radius-big"
              >
                집들이
              </button>
              <button
                onClick={() =>
                  handleNavigate('/mypage/MyQuestionPostScrapList')
                }
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
                hover="light-gray"
              />
            </div>
          </div>
        </div>

        <div className="text-zp-xl font-bold text-zp-gray">
          전체 {list.length}
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
                isSelecting && selectedPosts.length > 0
                  ? handleDeleteConfirmation
                  : toggleSelecting
              }
            >
              {isSelecting ? (
                selectedPosts.length === 0 ? (
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
          {list.map((post) => (
            <div
              key={post.board_serial}
              className={`relative rounded-zp-radius-big border border-zp-light-beige shadow-lg flex flex-col items-center ${
                selectedPosts.includes(post.board_serial)
                  ? 'bg-zp-light-gray'
                  : ''
              }`}
            >
              {isSelecting && (
                <div
                  className="absolute top-2 right-2 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePostSelect(post.board_serial);
                  }}
                >
                  {selectedPosts.includes(post.board_serial) ? (
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
                onClick={() => handleWorkerClick(post.board_serial)}
              >
                <QuestionPostListItem
                  title={post.title}
                  content={post.board_content}
                  profile_image={null} // 수정 필요
                  nickname={post.nickname}
                  calendar_image={null} // 수정 필요
                  upload_date={new Date(post.board_date)}
                  view_cnt={post.hit}
                  bookmark_cnt={post.wish_cnt}
                  comment_cnt={post.comment_cnt}
                  post_image={null} // 수정 필요
                  isBookmarked={bookmarkedPosts.includes(post.board_serial)}
                  onBookmarkToggle={handleBookmarkToggle}
                />
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
                  setSelectedPosts([]);
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
