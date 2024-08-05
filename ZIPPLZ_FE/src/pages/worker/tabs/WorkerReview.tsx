import HateWorkers from '@components/worker/detail/review/HateWorkers';
import LikeWorkers from '@components/worker/detail/review/LikeWorkers';
import MannerTemperature from '@components/worker/detail/review/MannerTemperature';
import ReviewComments from '@components/worker/detail/review/ReviewComments';
import Portfolio from '@pages/worker/Portfolio';

export default function WorkerReview() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100">
        <div className="w-full">
          {/* 매너 온도 + 분야별 매너 온도 */}
          <MannerTemperature />
          {/* [시공업자 이름]님은 이래서 좋아요 */}
          <LikeWorkers />
          {/* [시공업자 이름]님의 이런 모습이 고쳐졌으면 좋겠어요 */}
          <HateWorkers />
          <ReviewComments />
        </div>
      </div>
    </>
  );
}
