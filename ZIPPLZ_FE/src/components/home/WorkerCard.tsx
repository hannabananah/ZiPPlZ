import { useNavigate } from 'react-router-dom';

import { HotWorker } from '@pages/common/home/Home';

interface Props {
  worker: HotWorker;
}
export default function WorkerCard({ worker }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="relative profile-card pt-[30%] sm:pt-[30%] md:pt-[25%] mt-[1rem] cursor-pointer"
      style={{ width: '100%', height: 'auto' }}
      onClick={() => {
        navigate('/workers/1/portfolio?tab=overview');
      }}
    >
      <div className="bg-zp-main-color profile-img absolute top-[-25%]" />
      <p className="text-zp-2xs font-bold mt-4">{worker.name}</p>
      <p className="text-zp-3xs">{worker.region}</p>
      <div className="flex justify-center gap-2">
        <p className="text-zp-3xs">{worker.field}</p>
        <p className="text-zp-3xs">|</p>
        <p className="text-zp-3xs">{worker.temp}</p>
      </div>
    </div>
  );
}
