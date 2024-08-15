import { useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import QuestionPostListItem from '@/components/community/QuestionPostListItem';
import Input from '@components/common/Input';
import Selectbar from '@components/common/Selectbar';
import { useQuestionPostStore } from '@stores/QuestionPostStore';

type SortOption = '평점순' | '최신순' | '과거순';

export default function QuestionPost() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [inputValue, setInputValue] = useState<string>('');
  const [bookmarkCounts, setBookmarkCounts] = useState<{
    [key: number]: number;
  }>({});

  const navigate = useNavigate();
  const { questionPosts, fetchQuestionPosts } = useQuestionPostStore();

  useEffect(() => {
    fetchQuestionPosts();
  }, [fetchQuestionPosts]);

  const handleWritePost = () => {
    navigate('/QuestionPostCreate');
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

  const handleBookmarkChange = (postId: number, isBookmarked: boolean) => {
    setBookmarkCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (isBookmarked ? 1 : -1),
    }));
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6">
      <div className="w-full">
        {/* 드롭다운 버튼 */}
        <div className="mt-16 relative flex justify-center items-center">
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2"
          >
            <div className="font-bold text-zp-lg text-zp-black text-center">
              질문글
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
                className="block w-full text-left px-4 py-2 hover:bg-zp-gray"
              >
                집들이
              </button>
              <button
                onClick={() => handleNavigate('/QuestionPost')}
                className="block w-full text-left px-4 py-2 hover:bg-zp-gray"
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

        {/* 글의 제목이나 작성자 이름을 입력하세요. */}
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

        <div className="mt-6 grid grid-cols-1 gap-3">
          {questionPosts && questionPosts.length > 0 ? (
            questionPosts.map((post) => (
              <QuestionPostListItem
                key={post.board_serial}
                post_serial={post.board_serial}
                post_image={post.images?.[0] || ''}
                title={post.title}
                content={''} // content 속성을 사용하여 게시글 내용 표시
                calendar_image={null} // calendar_image는 null로 설정
                profile_image={null} // 기본 이미지 사용
                nickname={post.nickname}
                upload_date={new Date(post.board_date)}
                view_cnt={post.hit}
                bookmark_cnt={
                  bookmarkCounts[post.board_serial] !== undefined
                    ? bookmarkCounts[post.board_serial]
                    : post.wish_cnt
                }
                comment_cnt={post.comment_cnt}
                isBookmarked={false} // 기본값으로 false 설정 또는 적절한 값으로 설정
                onBookmarkToggle={handleBookmarkChange} // 북마크 토글 이벤트 핸들러 전달
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-zp-gray">
              게시물이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
