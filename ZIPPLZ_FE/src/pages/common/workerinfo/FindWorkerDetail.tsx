import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { FaTrashAlt } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { IoBookmarkOutline, IoChatbubblesOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import { writeReview } from '@/apis/board/reviewApi';
import { addWish, cancelWish, getWish } from '@/apis/board/wishApi';
import {
  deleteFindWorker,
  getFIndWorkerDetail,
} from '@/apis/worker/WorkerListApi';
import { useLoginUserStore } from '@/stores/loginUserStore';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import ModalComponent from '@components/common/Modal';
import Review from '@components/common/review/Review';
import { useModalActions } from '@stores/modalStore';
import { useWorkerListStore } from '@stores/workerListStore';

export default function FindWorkerDetail() {
  const checkWish = async (boardSerial: number) => {
    const response = await getWish(boardSerial);
    setIsWish(response.data.data);
  };
  const { id } = useParams<{ id: string }>();
  const boardSerial: number = id ? parseInt(id) : 0;
  const { loginUser } = useLoginUserStore();
  const { findWorker, setFindWorker } = useWorkerListStore();
  const [review, setReview] = useState<string>('');
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalActions();
  const fetchFindWorker = async (boardSerial: number) => {
    const response = await getFIndWorkerDetail(boardSerial);
    setFindWorker(response.data.data);
  };
  const [isWish, setIsWish] = useState<number>(-1);
  const handleClickRegistReview = async (
    boardSerial: number,
    review: string
  ) => {
    setReview('');
    return await writeReview({
      board_serial: boardSerial,
      comment_content: review,
      parent_comment_serial: -1,
      order_number: 0,
    });
  };
  const removeBoard = async (boardSerial: number) => {
    return await deleteFindWorker(boardSerial);
  };
  useEffect(() => {
    if (boardSerial > 0) {
      fetchFindWorker(boardSerial);
      checkWish(boardSerial);
    }
  }, []);
  const handleClickWish = async (boardSerial: number, type: number) => {
    if (isWish > 0) {
      setIsWish(0);
      return await cancelWish(boardSerial, type);
    } else {
      setIsWish(1);
      return await addWish(boardSerial, type);
    }
  };
  return (
    <>
      {findWorker ? (
        <>
          <div className="w-full relative flex flex-col mt-[3rem] mb-[9rem] p-6 gap-6 overflow-auto">
            {/* 나가기 버튼, 구인 글쓰기 text */}
            <div className="flex items-center justify-between w-full">
              <GoArrowLeft
                className="cursor-pointer"
                size={24}
                onClick={() => navigate(-1)}
              />
              <p className="font-bold text-center align-text-top text-zp-xl">
                시공자 찾기
              </p>
              {loginUser?.userSerial === findWorker.board?.userSerial && (
                <div className="flex gap-2">
                  <BsPencilSquare
                    size={12}
                    className="cursor-pointer"
                    onClick={() => {
                      if (findWorker)
                        navigate(
                          `/workers/findworker/update/${findWorker.board?.boardSerial}`
                        );
                    }}
                  />
                  <FaTrashAlt
                    size={12}
                    className="cursor-pointer"
                    onClick={() => openModal('select')}
                  />
                </div>
              )}
            </div>
            {/* 사진 */}
            <div className="flex w-full h-[220px] md:h-[300px]">
              <img
                src="/src/assets/data/cake.jpg"
                className="w-full h-full rounded-zp-radius-big"
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              {/* 글 제목 */}
              <p className="font-bold text-zp-lg text-wrap">
                {findWorker.board?.title}
              </p>

              {/* 글쓴이 프로필 사진, 닉네임, 주소 */}
              <div className="flex items-center">
                <CgProfile />
                <p className="font-bold text-zp-xs">
                  {findWorker.board?.nickname}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 border rounded-zp-radius-big border-zp-main-color bg-zp-white">
              <div className="flex items-center gap-2">
                <CiLocationOn size={20} />
                <p className="text-zp-2xs">Location</p>
              </div>

              <p className="font-bold text-zp-xs text-wrap">
                인천광역시 부평구 부평문화로 37 (부평동, 부평동아이파트)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-zp-lg">작업내용</p>
              <p className="w-full font-bold text-zp-xs text-zp-gray text-wrap">
                {findWorker.board?.boardContent}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-zp-lg">리뷰</p>
              <div className="relative flex w-full gap-4">
                <Input
                  inputType="search"
                  type="text"
                  width="full"
                  height={2}
                  placeholder="리뷰 작성하기"
                  radius="big"
                  fontSize="xs"
                  value={review}
                  onChange={(e: React.ChangeEvent) =>
                    setReview((e.target as HTMLInputElement).value)
                  }
                />
                <Button
                  buttonType="second"
                  children="등록"
                  fontSize="xs"
                  height={2}
                  width={4}
                  radius="btn"
                  onClick={() => {
                    handleClickRegistReview(boardSerial, review);
                    navigate(0);
                  }}
                />
                <IoChatbubblesOutline
                  size={16}
                  className="absolute top-2 left-4"
                />
              </div>
              {findWorker.comments &&
                findWorker.comments.length > 0 &&
                findWorker.comments.map((comment) => (
                  <Review
                    comment={comment.parent_comment || undefined}
                    childComments={comment.child_comments || undefined}
                    key={comment.parent_comment?.commentSerial}
                  />
                ))}
            </div>
          </div>
          <div
            className="fixed flex flex-col w-full gap-4 px-4 bg-zp-light-beige max-w-[600px]"
            style={{ bottom: '3.6rem' }}
          >
            <hr className="w-full text-zp-light-gray" />
            <div className="flex items-center w-full gap-4 mb-6">
              <Button
                buttonType={isWish > 0 ? 'primary' : 'normal'}
                width={loginUser?.role === 'worker' ? '50%' : 'full'}
                height={3}
                fontSize="lg"
                radius="btn"
                onClick={() => handleClickWish(boardSerial, 3)}
              >
                <IoBookmarkOutline size={24} />
                <span className="font-bold"> 찜하기</span>
              </Button>
              {loginUser?.role === 'worker' && (
                <Button
                  buttonType="second"
                  width="full"
                  height={3}
                  fontSize="lg"
                  radius="btn"
                >
                  <IoChatbubblesOutline size={24} />
                  <span className="font-bold">채팅하기</span>
                </Button>
              )}
            </div>
          </div>
          <ModalComponent
            type="select"
            title="게시글 삭제"
            message="해당 게시글을 삭제하시겠습니까?"
            onConfirm={() => {
              removeBoard(boardSerial);
              closeModal('select');
              navigate('/workers/findworker');
            }}
          />
        </>
      ) : (
        <div>is Loading</div>
      )}
    </>
  );
}
