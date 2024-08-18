import { useNavigate } from 'react-router-dom';

import { CertificatedBadge } from '@/assets/svg/icons';
import NoImage from '@assets/no-image-icon.svg?react';

interface Props {
  worker: any;
}
export default function WorkerInfoListItem({ worker }: Props) {
  const navigate = useNavigate();
  console.log('worke========>', worker);
  return (
    <div
      className="flex flex-col w-['30%'] bg-zp-white rounded-zp-radius-big cursor-pointer h-[10rem] drop-shadow-zp-slight"
      onClick={() =>
        navigate(`/workers/${worker.user_serial}/portfolio?tab=overview`)
      }
    >
      {worker.img ? (
        <img
          className="w-full h-[35%] object-cover transform scale-125 origin-top"
          src={worker.save_file}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-[40%]">
          <NoImage height="full" />
        </div>
      )}
      <div className="flex flex-col w-full p-2 mt-2">
        <div className="flex items-center gap-2">
          <p className="font-bold font-noto text-zp-gray text-zp-xs">
            {worker.user_name}
          </p>
          <p className="text-zp-2xs text-zp-light-gray">{worker.birth_date}</p>
          {worker.certificated_badge > 0 && (
            <CertificatedBadge width={16} height={16} />
          )}
        </div>
        <p className="text-zp-3xs text-zp-light-gray">{worker.temperature}</p>
        {worker.locations.map((region: string) => (
          <p className="text-zp-3xs text-zp-light-gray">{region}</p>
        ))}
        <p className=" text-zp-3xs text-zp-gray">
          {worker.field_name} | &nbsp;경력 {worker.career}년
        </p>
      </div>
    </div>
  );
}
