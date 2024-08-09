import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
// import { FaRegComment } from 'react-icons/fa';
// import { FaChevronDown } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { IoMdArrowDropdown } from 'react-icons/io';
// , IoMdArrowDropup
import { IoBookmarkOutline } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';
import { PiNotePencil } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import WorkerCard from '@/components/home/WorkerCard';
import Photos from '@/components/worker/detail/overView/Photos';

// 더미 데이터
export interface HotWorker {
  name: string;
  region: string;
  field: string;
  temp: string;
}

const list: HotWorker[] = [
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
];

export default function HousePostDetail() {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleEditClick = () => {
    navigate('/HousePostDetailCreate'); // URL을 필요에 따라 수정하세요.
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // 삭제 로직을 여기에 추가하세요.
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          <div className="mt-12">
            <GoArrowLeft
              className="mr-6 cursor-pointer"
              onClick={handleGoBack}
              size={20} // 아이콘 크기 조정
            />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-zp-2xl font-bold">제 집을 소개합니다</div>
              <div
                className="ml-2 cursor-pointer"
                onClick={handleBookmarkClick}
              >
                {isBookmarked ? (
                  <IoBookmark size={20} />
                ) : (
                  <IoBookmarkOutline size={20} />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-2 cursor-pointer" onClick={handleEditClick}>
                <PiNotePencil size={20} />
              </div>
              <div className="ml-2 cursor-pointer" onClick={handleDeleteClick}>
                <FaRegTrashAlt size={20} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-start items-center">
            <div className="">
              <CgProfile />
            </div>
            <div className="text-zp-md text-zp-gray">닉네임</div>
            <div className="ml-auto text-zp-xs text-zp-gray">24.7.17</div>
          </div>
          <div className="mt-2 text-zp-gray">작성일자</div>
          <div className="mt-4 flex justify-center">
            <img
              src="https://via.placeholder.com/600x400"
              alt="placeholder"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* 사진 swiper */}
          <Photos />

          {/* 글 내용 */}
          <div className="mt-6 text-zp-sm font-bold">본문내용 보이는 곳</div>

          {/* 이분들과 함께 했어요 text */}
          <div className="mt-6 text-zp-xl font-bold">이 분들과 함께 했어요</div>

          {/* workercard 나열 + swiper로 좌우 이동 가능 */}
          <div className="w-full mt-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {list.map((worker, index) => (
              <WorkerCard key={index} worker={worker} />
            ))}
          </div>

          {/* 리뷰 text */}
          <div className="mt-6 text-zp-xl font-bold">리뷰</div>

          {/* 댓글 수 */}
          <div className="mt-6 text-zp-xl font-bold">댓글 356개</div>

          {/* 시공업자의 이름을 입력하세요. */}
          <div className="mt-6 w-full flex space-x-2">
            {/* 댓글 다는 유저(본인) */}
            <div className="flex justify-start items-center">
              <div className="">
                <CgProfile size={40} />
              </div>
            </div>

            <Input
              placeholder="리뷰 작성하기"
              inputType="signup"
              type="text"
              width="100%"
              height={2.5}
              fontSize="xs"
              radius="none"
              // value={inputValue}
              // onChange={handleInputChange}
              additionalStyle="bg-zp-light-beige border-b-2 font-bold text-zp-gray"
            />
          </div>

          <div className="mt-6 flex flex-col">
            <div className="flex items-center">
              <CgProfile size={40} />
              <div className="px-2  text-zp-xs font-bold">원숭이</div>
              <div className="text-zp-xs text-zp-gray font-bold">· 2주 전</div>
            </div>
            <div className="ml-12 text-zp-xs font-bold text-zp-gray">
              리뷰 내용
            </div>
          </div>

          <div className="flex justify-start items-center">
            <div>
              <IoMdArrowDropdown />
            </div>
            <div className="p-2 font-bold">답글 1개</div>
            {/* <div className="ml-2">
              <FaRegComment />
            </div>
            <div className="ml-2">답글 작성하기</div> */}
          </div>

          <div className="ml-12 mt-2 flex justify-start items-center">
            <div className="">
              <CgProfile size={40} />
            </div>
            <div className="ml-2 text-zp-xs font-bold">대댓글 유저</div>
            <div className="ml-2 text-zp-xs font-bold text-zp-gray">
              · 2주 전
            </div>
          </div>
          <div className="ml-12 mb-12">
            <div className="ml-12 text-zp-xs font-bold text-zp-gray">
              감사합니다ㅠㅠ
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50">
          <div className="bg-zp-white p-6 rounded-zp-radius-big shadow-lg">
            <div className="text-lg font-bold mb-4">삭제 확인</div>
            <div className="mb-4">정말로 삭제하시겠습니까?</div>
            <div className="flex justify-end space-x-4">
              {/* 모달의 취소 버튼 */}
              <div className="font-bold">
                <Button
                  children="취소"
                  buttonType="light"
                  width={8}
                  height={2.5}
                  fontSize="xs"
                  radius="full"
                  onClick={handleCloseModal}
                />
              </div>
              {/* 모달의 삭제 버튼 */}
              <div className="font-bold">
                <Button
                  children="삭제"
                  buttonType="second"
                  width={8}
                  height={2.5}
                  fontSize="xs"
                  radius="full"
                  onClick={handleConfirmDelete}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
