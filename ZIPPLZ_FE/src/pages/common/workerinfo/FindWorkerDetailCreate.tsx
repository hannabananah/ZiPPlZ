import { ChangeEvent, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { CiSearch } from 'react-icons/ci';
import { FaCamera } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { useWorkerListStore } from '@/stores/workerListStore';
import { getFindWorkerList, writeFindWorker } from '@apis/worker/WorkerListApi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

const postCodeStyle = {
  width: '200px',
  height: '30rem',
};
const customModalStyles: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    maxWidth: '468px',
    minWidth: '350px',
    height: '30rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'center',
    padding: '1.5rem',
    zIndex: 1500,
  },
};
// 이미지 상태의 타입 정의
type Image = File;

export default function FindWorkerDetailCreate() {
  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [workDetail, setWorkDetail] = useState<string>('');
  const [openDaum, setOpenDaum] = useState<boolean>(false);
  const navigate = useNavigate();
  const onCompletePost = (data: any) => {
    setAddress(data.address);
    setOpenDaum(false);
  };
  //리스트 이동
  const goList = () => navigate('/workers/findworker');

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    setImages((prevImages: Image[]) => [
      ...prevImages,
      ...files.slice(0, 10 - prevImages.length),
    ]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const { setFindWorkerList } = useWorkerListStore();
  const fetchFindWorkerList = async () => {
    const response = await getFindWorkerList();
    setFindWorkerList(response.data.data);
  };
  // 확인 버튼 핸들러
  const handleClickRegistButton = async (
    images: Image[],
    title: string,
    content: string
  ) => {
    await writeFindWorker({
      images: images,
      title: title,
      board_content: content,
      user_address: address,
    });
    await fetchFindWorkerList();
  };

  return (
    <>
      <div className="flex flex-col w-full p-6 mt-[3rem] gap-4 mb-[4rem]">
        <div className="w-full relateive">
          <GoArrowLeft className="absolute cursor-pointer" onClick={goList} />
          <p className="w-full font-extrabold text-center align-text-top text-zp-xl">
            구인 글쓰기
          </p>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="font-bold text-zp-xl">
            현장이나 일과 관련된 사진을 올려주세요.(선택사항)
          </p>
          <p className="text-zp-xs text-zp-light-gray">
            사진을 첨부하면 시공자가 작업내용에 대해 보다 상세하게 파악할 수
            있어요.
          </p>
        </div>
        <div className="flex items-start gap-1">
          <div className="flex flex-col items-center justify-center w-[5rem] aspect-square relative bg-zp-light-gray rounded-zp-radius-big">
            <label htmlFor="file-upload">
              <FaCamera size={36} className="" />
              <p className="font-bold text-center text-zp-xs text-zp-gray">
                {images.length}/10
              </p>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              multiple
            />
          </div>
          <div className="flex overflow-x-auto">
            {images.map((image, index) => (
              <div key={index} className="relative w-[5rem] h-[5rem] ">
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full opacity-50 rounded-zp-radius-big"
                  onClick={() => handleImageRemove(index)}
                />
                <MdClose
                  size={24}
                  onClick={() => handleImageRemove(index)}
                  className="absolute rounded-zp-radius-full bg-zp-red text-zp-white top-1 right-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="font-bold text-zp-md">제목</p>
          <Input
            type="text"
            placeholder="제목을 입력 해주세요."
            inputType="login"
            width="100%"
            height={2}
            className=""
            fontSize="xs"
            radius="none"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <div className="relative flex flex-col w-full gap-1">
          <p className="font-bold text-zp-md">현장 주소</p>
          <Input
            type="text"
            placeholder="작업을 희망하는 주소를 입력해주세요."
            inputType="login"
            width="100%"
            height={2}
            fontSize="xs"
            radius="none"
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
          <CiSearch
            size={16}
            className="absolute right-3 top-[2rem]"
            onClick={() => setOpenDaum(true)}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <p className="font-bold text-zp-md">작업내용</p>
          <textarea
            placeholder="희망하시는 작업 또는 시공에 대해 입력해주세요."
            value={workDetail}
            className="w-full h-[15rem] p-4 border text-zp-xs border-zp-main-color rounded-zp-radius-btn bg-zp-transparent resize-none"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setWorkDetail((e.target as HTMLTextAreaElement).value)
            }
          />
        </div>
        <Button
          children="확인"
          buttonType="second"
          width="full"
          height={3}
          fontSize="xl"
          radius="btn"
          onClick={() => {
            handleClickRegistButton(images, title, workDetail);

            setTimeout(() => {
              goList();
            }, 2000); // 1000ms (1초) 후에 실행
          }}
        />
      </div>
      <Modal
        style={customModalStyles}
        isOpen={openDaum}
        onRequestClose={onCompletePost}
      >
        <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />
      </Modal>
    </>
  );
}
