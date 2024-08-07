import { CgProfile } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { IoBookmarkOutline } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';
import { PiNotePencil } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

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

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate(-1);
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
          <div className="flex justify-start items-center">
            <div className="text-zp-2xl font-bold">제 집을 소개합니다</div>
            <div className="ml-2">
              <IoBookmarkOutline size={20} />
            </div>
            <div className="">
              <PiNotePencil />
            </div>
            <div className="">
              <FaRegTrashAlt />
            </div>
          </div>

          <div className="flex justify-start">
            <div className="">
              <CgProfile />
            </div>
            <div className="text-zp-md text-zp-gray">닉네임</div>
          </div>

          <div className="ext-zp-gray">작성일자</div>

          {/* 사진(이 위치에서 스와이프해도 슬라이딩 동작) */}
          <div className="mt-4 flex justify-center">
            <img
              src="https://via.placeholder.com/600x400"
              alt="placeholder"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* 사진 swiper */}
          <Photos />

          <div className="text-zp-sm font-bold">본문 내용</div>
          <div className="text-zp-xl font-bold">이분들과 함께했어요</div>
          {/* workerInfoListitem 컴포넌트 */}
          <div className="w-full mt-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {list.map((worker, index) => (
              <WorkerCard key={index} worker={worker} />
            ))}
          </div>
          <div className="text-zp-xl font-bold">리뷰</div>
          <div>
            <Input
              placeholder="리뷰 작성하기"
              inputType="search"
              type="search"
              width="full"
              height={2.5}
              fontSize="xs"
              radius="btn"
              // onClick={handleInputClick2}
              // onChange={handleInputChange} // `onChange` 핸들러 추가
              additionalStyle="pl-8 bg-zp-light-beige border-b-2 font-bold border-zp-sub-color"
            />
          </div>

          <div className="p-6 border border-zp-main-color rounded-zp-radius-big">
            <div className="flex justify-start">
              <div className="">
                <CgProfile />
              </div>
              <div className="font-bold">원숭이</div>
              <div className="text-zp-xs">24.7.17</div>
            </div>

            <div className="text-zp-2xs font-bold text-zp-gray">리뷰 내용</div>

            <div className="flex justify-start">
              <div>
                <FaChevronDown />
              </div>
              <div className="">1개 댓글 보기</div>
              <div className="">
                <FaRegComment />
              </div>
              <div className="">답글 작성하기</div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="">
              <CgProfile />
            </div>
            <div className="">대댓글</div>
          </div>
          <div className="p-6 border border-zp-main-color rounded-zp-radius-big">
            <div className="">감사합니다ㅠㅠ</div>
          </div>
        </div>
      </div>
    </>
  );
}
