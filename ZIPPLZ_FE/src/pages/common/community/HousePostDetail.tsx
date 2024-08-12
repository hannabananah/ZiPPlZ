import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoBookmarkOutline } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';
import { PiNotePencil } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import WorkerCard from '@/components/home/WorkerCard';
import Photos from '@/components/worker/detail/overView/Photos';
import { useHousePostStore } from '@/stores/housePostStore';

export default function HousePostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const { fetchPostDetails, postDetails, deletePost } = useHousePostStore();

  useEffect(() => {
    if (id) {
      fetchPostDetails(Number(id));
    }
  }, [id, fetchPostDetails]);

  if (!postDetails) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 표시할 UI
  }

  const handleGoBack = () => {
    navigate('/housepost');
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleEditClick = () => {
    navigate(`/HousePostDetailCreate/${id}`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const { code, message } = await deletePost(token, Number(id));

    if (code === 200) {
      alert('게시글이 성공적으로 삭제되었습니다.');
      navigate('/housepost');
    } else {
      alert(`게시글 삭제에 실패했습니다: ${message}`);
    }

    setIsDeleteModalOpen(false);
  };

  const handleCommentSubmit = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const comment = {
      board_serial: Number(id),
      comment_content: commentContent,
      parent_comment_serial: -1,
      order_number: 1,
    };

    const { code, message } = await addComment(token, comment);

    if (code === 200) {
      alert('댓글이 성공적으로 저장되었습니다.');
      setCommentContent('');
    } else {
      alert(`댓글 저장에 실패했습니다: ${message}`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          <div className="mt-12">
            <GoArrowLeft
              className="mr-6 cursor-pointer"
              onClick={handleGoBack}
              size={20}
            />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-zp-2xl font-bold">{postDetails.title}</div>
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
            <div className="text-zp-md text-zp-gray">
              {postDetails.nickname}
            </div>
            <div className="ml-auto text-zp-xs text-zp-gray">
              {new Date(postDetails.boardDate).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            {postDetails.board_images && postDetails.board_images.length > 0 ? (
              postDetails.board_images.map((image) => (
                <img
                  key={image.saveFile}
                  src={image.saveFile}
                  alt="post image"
                  className="rounded-lg shadow-md"
                />
              ))
            ) : (
              <div>No images available</div>
            )}
          </div>

          {/* 글 내용 */}
          <div className="mt-6 text-zp-sm font-bold">
            {postDetails.boardContent}
          </div>

          {/* 이분들과 함께 했어요 text */}
          <div className="mt-6 text-zp-xl font-bold">이 분들과 함께 했어요</div>

          {/* workercard 나열 */}
          <div className="flex w-full overflow-x-auto mt-4">
            <div className="flex justify-between w-full h-[8rem] ">
              {postDetails.tags && postDetails.tags.length > 0 ? (
                postDetails.tags.map((worker) => (
                  <WorkerCard key={worker.portfolio_serial} worker={worker} />
                ))
              ) : (
                <div>No workers tagged</div>
              )}
            </div>
          </div>

          {/* 댓글 수 */}
          <div className="mt-6 text-zp-xl font-bold">
            댓글 {postDetails.comments ? postDetails.comments.length : 0}개
          </div>

          {/* 댓글 작성 */}
          <div className="mt-6 w-full flex space-x-2">
            <div className="flex justify-start items-center">
              <CgProfile size={40} />
            </div>

            <Input
              placeholder="리뷰 작성하기"
              inputType="signup"
              type="text"
              width="100%"
              height={2.5}
              fontSize="xs"
              radius="none"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              additionalStyle="bg-zp-light-beige border-b-2 font-bold text-zp-gray"
            />
            <Button
              children="댓글 추가"
              buttonType="second"
              width={8}
              height={2.5}
              fontSize="xs"
              radius="full"
              onClick={handleCommentSubmit}
            />
          </div>

          {/* 댓글 표시 */}
          {postDetails.comments && postDetails.comments.length > 0 ? (
            postDetails.comments.map((comment, index) => (
              <div key={index} className="mt-6 flex flex-col">
                <div className="flex items-center">
                  <CgProfile size={40} />
                  <div className="px-2 text-zp-xs font-bold">
                    {comment.parent_comment.nickName}
                  </div>
                  <div className="text-zp-xs text-zp-gray font-bold">
                    ·{' '}
                    {new Date(
                      comment.parent_comment.commentDate
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="ml-12 text-zp-xs font-bold text-zp-gray">
                  {comment.parent_comment.commentContent}
                </div>

                {/* 답글 표시 */}
                {comment.child_comments &&
                  comment.child_comments.length > 0 &&
                  comment.child_comments.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      className="ml-12 mt-2 flex justify-start items-center"
                    >
                      <CgProfile size={40} />
                      <div className="ml-2 text-zp-xs font-bold">
                        {child.nickName}
                      </div>
                      <div className="ml-2 text-zp-xs font-bold text-zp-gray">
                        · {new Date(child.commentDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div>No comments available</div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50">
          <div className="bg-zp-white p-6 rounded-zp-radius-big shadow-lg">
            <div className="text-lg font-bold mb-4">삭제 확인</div>
            <div className="mb-4">정말로 삭제하시겠습니까?</div>
            <div className="flex justify-end space-x-4">
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
