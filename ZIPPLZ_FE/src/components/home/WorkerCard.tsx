import { useNavigate } from 'react-router-dom';

interface Props {
  worker: any;
}

export default function WorkerCard({ worker }: Props) {
  const navigate = useNavigate();

  // worker와 관련된 필드가 존재하는지 확인
  const location =
    worker.locations && worker.locations.length > 0
      ? worker.locations[0]
      : '위치 정보 없음';
  const fieldName = worker.field_name || '분야 정보 없음';
  const temperature = worker.temperature || '온도 정보 없음';

  return (
    <div className="relative flex flex-col justify-end flex-shrink-0 h-full px-5 cursor-pointer sm:w-1/3 md:w-1/3">
      <div
        className="px-4 profile-card"
        style={{ width: '100%', height: '80%' }}
        onClick={() => {
          navigate('/workers/1/portfolio?tab=overview');
        }}
      >
        <div className="profile-img absolute top-[-25%] w-[60%]">
          <img
            className="w-full h-full  border rounded-zp-radius-full object-cover"
            src={worker.img}
          />
        </div>
        <p className="md:mt-[30%] mt-[50%] font-bold text-zp-2xs">
          {worker.user_name || '이름 없음'}
        </p>
        <p className="text-zp-3xs">{worker.locations[0]}</p>
        {worker.locations.length > 1 && (
          <p className="text-zp-3xs">{worker.locations[1]}</p>
        )}
        <div className="flex justify-center gap-2">
          <p className="text-zp-3xs">{fieldName}</p>
          <p className="text-zp-3xs">|</p>
          <p className="text-zp-3xs">{temperature}</p>
        </div>
      </div>
    </div>
  );
}
