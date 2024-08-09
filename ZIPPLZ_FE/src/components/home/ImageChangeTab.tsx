import ImageChange from '@assets/svg/icons/ImageChange';

interface Props {
  onClick: () => void;
}
export default function ImageChangeTab({ onClick }: Props) {
  return (
    <>
      <div
        className="relative w-full h-[8.3rem] rounded-zp-radius-big sm: p-4 md:p-6 flex flex-col justify-center items-center gap-1 bg-zp-white cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-center w-full">
          <ImageChange width={130} height={100} />
        </div>
        <p className="font-bold text-zp-sm text-zp-light-gray">
          내 집 꾸미러 가기
        </p>
      </div>
    </>
  );
}
