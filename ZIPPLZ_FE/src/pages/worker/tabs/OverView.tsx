import AboutMe from '@components/worker/detail/overView/AboutMe';
import CareerAndCertificate from '@components/worker/detail/overView/CareerAndCertificate';
import Photos from '@components/worker/detail/overView/Photos';
import WantToTalk from '@components/worker/detail/overView/WantToTalk';
import Portfolio from '@pages/worker/Portfolio';

export default function OverView() {
  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* Portfolio 컴포넌트 상단에 배치 */}
          <Portfolio />

          {/* About Me 컴포넌트 */}
          <AboutMe />

          {/* 사진 표시 컴포넌트 */}
          <Photos />

          {/* 경력 및 자격증 */}
          <CareerAndCertificate />

          {/* 하고 싶은 얘기 */}
          <WantToTalk />
        </div>
      </div>
    </>
  );
}
