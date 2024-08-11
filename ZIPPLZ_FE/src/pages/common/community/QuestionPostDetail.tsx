import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { PiNotePencil } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import axios from 'axios';

export default function QuestionPostDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .post(`http://localhost:5000/board/question/list/${id}`)
        .then((response) => {
          const { board, board_images, comments } = response.data.data;
          setPost({
            ...board,
            images: board_images.map((img) => img.saveFile),
            comments,
          });
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleEditClick = () => {
    navigate('/QuestionPostDetailCreate', {
      state: { post, isEditMode: true },
    });
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

  if (!post) {
    return <div>Loading...</div>;
  }

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
              <div className="text-zp-2xl font-bold">{post.title}</div>
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
            <div className="text-zp-md text-zp-gray">{post.nickname}</div>
            <div className="ml-auto text-zp-xs text-zp-gray">
              {new Date(post.boardDate).toLocaleDateString('ko-KR')}
            </div>
          </div>
          <div className="mt-2 text-zp-gray">작성일자</div>

          {/* 이미지 렌더링 */}
          <div className="mt-4 flex justify-center">
            {post.images && post.images.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {post.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="rounded-lg shadow-md m-2"
                    style={{ maxHeight: '400px', maxWidth: '600px' }}
                  />
                ))}
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/600x400"
                alt="placeholder"
                className="rounded-lg shadow-md"
              />
            )}
          </div>

          {/* 글 내용 */}
          <div className="mt-6 text-zp-sm font-bold">{post.boardContent}</div>

          {/* 댓글 렌더링 */}
          <div className="mt-6 text-zp-xl font-bold">댓글</div>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment: any, index: number) => (
              <div key={index} className="mt-4">
                <div className="flex items-center">
                  <CgProfile size={40} />
                  <div className="px-2 text-zp-xs font-bold">
                    {comment.parent_comment.nickName}
                  </div>
                  <div className="text-zp-xs text-zp-gray font-bold">
                    ·{' '}
                    {new Date(
                      comment.parent_comment.commentDate
                    ).toLocaleDateString('ko-KR')}
                  </div>
                </div>
                <div className="ml-12 text-zp-xs font-bold text-zp-gray">
                  {comment.parent_comment.commentContent}
                </div>
                {/* 대댓글 렌더링 */}
                {comment.child_comments &&
                  comment.child_comments.length > 0 && (
                    <div className="ml-12">
                      {comment.child_comments.map(
                        (childComment: any, childIndex: number) => (
                          <div
                            key={childIndex}
                            className="mt-2 flex justify-start items-center"
                          >
                            <div className="">
                              <CgProfile size={40} />
                            </div>
                            <div className="ml-2 text-zp-xs font-bold">
                              {childComment.nickName}
                            </div>
                            <div className="ml-2 text-zp-xs font-bold text-zp-gray">
                              ·{' '}
                              {new Date(
                                childComment.commentDate
                              ).toLocaleDateString('ko-KR')}
                            </div>
                            <div className="ml-12 text-zp-xs font-bold text-zp-gray">
                              {childComment.commentContent}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))
          ) : (
            <div className="text-zp-xs text-zp-gray">댓글이 없습니다.</div>
          )}

          {/* 댓글 입력 */}
          <div className="mt-6 w-full flex space-x-2">
            <div className="flex justify-start items-center">
              <div className="">
                <CgProfile size={40} />
              </div>
            </div>

            <Input
              placeholder="댓글 작성하기"
              inputType="signup"
              type="text"
              width="100%"
              height={2.5}
              fontSize="xs"
              radius="none"
              additionalStyle="bg-zp-light-beige border-b-2 font-bold text-zp-gray"
            />
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
