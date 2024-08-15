import ImageChange from '@assets/svg/icons/ImageChange';

interface Props {
  onClick: () => void;
}
export default function ImageChangeTab({ onClick }: Props) {
  return (
    <>
      <div
        className="relative w-full h-[4rem] rounded-zp-radius-big flex items-center  gap-1 bg-zp-white cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-center w-full">
          <ImageChange width={70} height={50} />
        </div>
      </div>
    </>
  );
}
