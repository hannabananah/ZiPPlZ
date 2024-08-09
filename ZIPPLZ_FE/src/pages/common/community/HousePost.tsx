import { useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Selectbar from '@components/common/Selectbar';
import HousePostListItem from '@components/community/HousePostListItem';
import { useHousePostStore } from '@stores/housePostStore';

type SortOption = '평점순' | '최신순' | '과거순';

export default function HousePost() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>('평점순');
  const [inputValue, setInputValue] = useState<string>('');

  const navigate = useNavigate();
  const { housePosts, fetchHousePosts } = useHousePostStore();

  useEffect(() => {
    fetchHousePosts(); // 컴포넌트가 마운트될 때 API에서 데이터 가져오기
  }, [fetchHousePosts]);

  const handleWritePost = () => {
    navigate('/HousePostDetailCreate');
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

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {housePosts && housePosts.length > 0 ? (
              housePosts.map((post) => (
                <HousePostListItem
                  key={post.board_serial}
                  post_serial={post.board_serial}
                  post_image={post.img}
                  title={post.title}
                  profile_image={post.img || 'https://via.placeholder.com/50'} // 기본 이미지 사용
                  nickname={post.nickname}
                  upload_date={new Date(post.board_date)}
                  view_cnt={post.hit}
                  bookmark_cnt={post.wish_cnt}
                  comment_cnt={post.comment_cnt}
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
    </>
  );
}
