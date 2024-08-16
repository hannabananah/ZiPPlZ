import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import ImageChange from '@assets/svg/icons/ImageChange';

interface Props {
  onClick: () => void;
  loading: boolean;
}

export default function ImageChangeViewTab({ onClick, loading }: Props) {
  return (
    <>
      <div
        className="relative w-full h-[4rem] rounded-zp-radius-big flex items-center gap-1 bg-zp-white cursor-pointer drop-shadow-zp-slight"
        onClick={onClick}
      >
        {loading ? (
          <Skeleton width="100%" height="100%" />
        ) : (
          <div className="flex items-center justify-center w-full hover:text-zp-black">
            <p className="absolute text-zp-3xs text-zp-gray font-noto">
              아직 업로드된 이미지가 없습니다!
            </p>
            <div className="absolute opacity-20 bg-zp-white">
              <ImageChange width={70} height={50} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
