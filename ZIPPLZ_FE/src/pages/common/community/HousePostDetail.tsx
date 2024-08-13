import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { GoPencil } from 'react-icons/go';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { PiNotePencil } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import WorkerCard from '@/components/home/WorkerCard';
import { useHousePostStore } from '@/stores/housePostStore';

export default function HousePostDetail({ onBookmarkChange = () => {} }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [isCommentActive, setIsCommentActive] = useState(false);
  const [activeReplyComment, setActiveReplyComment] = useState<number | null>(
    null
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 댓글 또는 답글 수정 상태
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // 드롭다운 상태
  const {
    fetchPostDetails,
    postDetails,
    deletePost,
    addComment,
    addReply,
    toggleBookmark,
    deleteComment,
  } = useHousePostStore();

  useEffect(() => {
    if (id) {
      fetchPostDetails(Number(id)).then((data) => {
        setIsBookmarked(data?.wish_cnt > 0); // 서버에서 받은 초기 북마크 상태 설정
      });
    }
  }, [id, fetchPostDetails]);

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate('/housepost');
  };

  const handleBookmarkClick = async () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    // 북마크 상태 변경 시 콜백 호출
    onBookmarkChange(Number(id), newBookmarkState);

    // 실제 API 호출은 생략했지만, 필요시 아래에서 처리
    // const result = await toggleBookmark(Number(id), newBookmarkState);
  };

  const handleEditClick = () => {
    navigate('/HousePostUpdate', {
      state: { post: postDetails, isEditMode: true },
    });
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
      setIsCommentActive(false);
      fetchPostDetails(Number(id)); // 댓글 추가 후 게시글 새로고침
    } else {
      alert(`댓글 저장에 실패했습니다: ${message}`);
    }
  };

  const handleReplySubmit = async (parentCommentSerial: number) => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const reply = {
      board_serial: Number(id),
      comment_content: replyContent,
      parent_comment_serial: parentCommentSerial,
      order_number: 1,
    };

    const { code, message } = await addReply(token, reply);

    if (code === 200) {
      alert('대댓글이 성공적으로 저장되었습니다.');
      setReplyContent('');
      setActiveReplyComment(null);
      fetchPostDetails(Number(id)); // 대댓글 추가 후 게시글 새로고침
    } else {
      alert(`대댓글 저장에 실패했습니다: ${message}`);
    }
  };

  const toggleCommentExpand = (commentSerial: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentSerial]: !prev[commentSerial],
    }));
  };

  const isAuthor = (userSerial: number) => {
    const loginUserData = localStorage.getItem('login-user');

    if (loginUserData) {
      const parsedData = JSON.parse(loginUserData);
      const currentUserSerial = parsedData.state.loginUser.userSerial;
      return userSerial === currentUserSerial;
    }

    return false; // 로그인 정보가 없을 경우 false 반환
  };

  const handleCommentClick = () => {
    setIsCommentActive(true);
  };

  const handleCancelComment = () => {
    setIsCommentActive(false);
    setCommentContent('');
  };

  const handleReplyClick = (commentSerial: number) => {
    setActiveReplyComment(commentSerial);
  };

  const handleCancelReply = () => {
    setActiveReplyComment(null);
    setReplyContent('');
  };

  const handleToggleDropdown = (commentSerial: number) => {
    setDropdownOpen((prev) => (prev === commentSerial ? null : commentSerial));
  };

  const handleEditComment = (commentSerial: number) => {
    setEditingCommentId(commentSerial);
    setDropdownOpen(null); // 드롭다운 닫기
  };

  const handleDeleteComment = async (commentSerial: number) => {
    const token = `Bearer ${localStorage.getItem('token')}`;

    const { code, message } = await deleteComment(token, commentSerial);

    if (code === 200) {
      alert('댓글이 성공적으로 삭제되었습니다.');
      setEditingCommentId(null);
      fetchPostDetails(Number(id)); // 새로고침
    } else {
      alert(`댓글 삭제에 실패했습니다: ${message}`);
    }
  };

  const handleSaveEditedComment = async (commentSerial: number) => {
    // 로컬 상태에서 댓글 수정 후, 게시글을 다시 불러옵니다.
    setEditingCommentId(null); // 수정 모드 해제
    fetchPostDetails(Number(id)); // 새로고침
    alert('댓글이 성공적으로 수정되었습니다.');
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
            <div>
              <CgProfile size={40} />
            </div>
            <div className="text-zp-md text-zp-gray">
              {postDetails.nickname}
            </div>
            <div className="ml-auto text-zp-xs text-zp-gray">
              {new Date(postDetails.boardDate).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            {postDetails.images && postDetails.images.length > 0 ? (
              postDetails.images.map((image, index) => (
                <img
                  key={index}
                  src={image.saveFile}
                  alt={`post image ${index + 1}`}
                  className="rounded-lg shadow-md"
                />
              ))
            ) : (
              <div>No images available</div>
            )}
          </div>

          <div className="mt-6 text-zp-sm font-bold">
            {postDetails.boardContent}
          </div>

          <div className="mt-6 text-zp-xl font-bold">이 분들과 함께 했어요</div>

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

          <div className="mt-6 text-zp-xl font-bold">
            댓글 {postDetails.comments ? postDetails.comments.length : 0}개
          </div>

          <div className="mb-12 mt-6 w-full flex space-x-2">
            <div className="flex justify-start items-start">
              <CgProfile size={40} />
            </div>

            <div className="w-full">
              <Input
                placeholder="리뷰 작성하기"
                inputType="signup"
                type="text"
                width="100%"
                height={2.5}
                fontSize="xs"
                radius="none"
                value={commentContent}
                onClick={handleCommentClick}
                onChange={(e) => setCommentContent(e.target.value)}
                additionalStyle="bg-zp-light-beige border-b-2 font-bold text-zp-gray"
              />
              {isCommentActive && (
                <div className="flex justify-end mt-2 space-x-2">
                  <Button
                    children="취소"
                    buttonType="light"
                    width={8}
                    height={2.5}
                    fontSize="xs"
                    radius="full"
                    onClick={handleCancelComment}
                  />
                  <Button
                    children="댓글"
                    buttonType="second"
                    width={8}
                    height={2.5}
                    fontSize="xs"
                    radius="full"
                    onClick={handleCommentSubmit}
                  />
                </div>
              )}
            </div>
          </div>

          {postDetails.comments && postDetails.comments.length > 0 ? (
            postDetails.comments.map((comment, index) => (
              <div key={index} className="mb-12 mt-6 flex flex-col">
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
                  {isAuthor(comment.parent_comment.userSerial) && (
                    <div className="ml-auto cursor-pointer relative">
                      <BsThreeDotsVertical
                        size={20}
                        onClick={() =>
                          handleToggleDropdown(
                            comment.parent_comment.commentSerial
                          )
                        }
                      />
                      {dropdownOpen ===
                        comment.parent_comment.commentSerial && (
                        <div className="absolute right-0 mt-2 w-24 bg-zp-sub-color border border-zp-main-color rounded-zp-radius-big shadow-lg hover: bg-zp-main-color">
                          <div className="flex justify-center items-center">
                            <div className="p-2">
                              <FaRegTrashAlt />
                            </div>
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleEditComment(
                                  comment.parent_comment.commentSerial
                                )
                              }
                            >
                              수정
                            </div>
                          </div>

                          <div className="flex justify-center items-center">
                            <div className="p-2">
                              <GoPencil />
                            </div>
                            <div
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() =>
                                handleDeleteComment(
                                  comment.parent_comment.commentSerial
                                )
                              }
                            >
                              삭제
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="ml-12 text-zp-xs font-bold text-zp-gray">
                  {editingCommentId === comment.parent_comment.commentSerial ? (
                    <div className="flex items-center">
                      <Input
                        placeholder="댓글 수정하기"
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
                        children="저장"
                        buttonType="second"
                        width={8}
                        height={2.5}
                        fontSize="xs"
                        radius="full"
                        onClick={() =>
                          handleSaveEditedComment(
                            comment.parent_comment.commentSerial
                          )
                        }
                      />
                    </div>
                  ) : (
                    comment.parent_comment.commentContent
                  )}
                </div>
                <div className="flex justify-start ml-12 mt-2">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      toggleCommentExpand(comment.parent_comment.commentSerial)
                    }
                  >
                    {expandedComments[comment.parent_comment.commentSerial] ? (
                      <IoIosArrowUp size={20} />
                    ) : (
                      <IoIosArrowDown size={20} />
                    )}
                  </div>
                  <div
                    className="cursor-pointer text-zp-xs text-zp-main-color font-bold ml-2"
                    onClick={() =>
                      toggleCommentExpand(comment.parent_comment.commentSerial)
                    }
                  >
                    답글 {comment.child_comments.length}개
                  </div>
                </div>

                {expandedComments[comment.parent_comment.commentSerial] && (
                  <>
                    <div className="ml-12 mt-4 flex space-x-2 items-start">
                      <CgProfile size={40} />
                      <div className="w-full">
                        <Input
                          placeholder="답글"
                          inputType="signup"
                          type="text"
                          width="100%"
                          height={2.5}
                          fontSize="xs"
                          radius="none"
                          value={replyContent}
                          onClick={() =>
                            handleReplyClick(
                              comment.parent_comment.commentSerial
                            )
                          }
                          onChange={(e) => setReplyContent(e.target.value)}
                          additionalStyle="bg-zp-light-beige border-b-2 font-bold text-zp-gray"
                        />
                        {activeReplyComment ===
                          comment.parent_comment.commentSerial && (
                          <div className="flex justify-end mt-2 space-x-2">
                            <Button
                              children="취소"
                              buttonType="light"
                              width={8}
                              height={2.5}
                              fontSize="xs"
                              radius="full"
                              onClick={handleCancelReply}
                            />
                            <Button
                              children="대댓글 추가"
                              buttonType="second"
                              width={8}
                              height={2.5}
                              fontSize="xs"
                              radius="full"
                              onClick={() =>
                                handleReplySubmit(
                                  comment.parent_comment.commentSerial
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {comment.child_comments &&
                      comment.child_comments.length > 0 &&
                      comment.child_comments.map((child, childIndex) => (
                        <div
                          key={childIndex}
                          className="ml-12 mt-2 flex flex-col"
                        >
                          <div className="flex items-center">
                            <CgProfile size={40} />
                            <div className="px-2 text-zp-xs font-bold">
                              {child.nickName}
                            </div>
                            <div className="text-zp-xs text-zp-gray font-bold">
                              ·{' '}
                              {new Date(child.commentDate).toLocaleDateString()}
                            </div>
                            {isAuthor(child.userSerial) && (
                              <div className="ml-auto cursor-pointer relative">
                                <BsThreeDotsVertical
                                  size={20}
                                  onClick={() =>
                                    handleToggleDropdown(child.commentSerial)
                                  }
                                />
                                {dropdownOpen === child.commentSerial && (
                                  <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 shadow-lg">
                                    <div
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                      onClick={() =>
                                        handleEditComment(child.commentSerial)
                                      }
                                    >
                                      수정
                                    </div>
                                    <div
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                      onClick={() =>
                                        handleDeleteComment(child.commentSerial)
                                      }
                                    >
                                      삭제
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="ml-12 text-zp-xs font-bold text-zp-gray">
                            {editingCommentId === child.commentSerial ? (
                              <div className="flex items-center">
                                <Input
                                  placeholder="답글 수정하기"
                                  inputType="signup"
                                  type="text"
                                  width="100%"
                                  height={2.5}
                                  fontSize="xs"
                                  radius="none"
                                  value={replyContent}
                                  onChange={(e) =>
                                    setReplyContent(e.target.value)
                                  }
                                  additionalStyle="bg-zp-light-beige border-b-2 font-bold text-zp-gray"
                                />
                                <Button
                                  children="저장"
                                  buttonType="second"
                                  width={8}
                                  height={2.5}
                                  fontSize="xs"
                                  radius="full"
                                  onClick={() =>
                                    handleSaveEditedComment(child.commentSerial)
                                  }
                                />
                              </div>
                            ) : (
                              child.commentContent
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                )}
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
