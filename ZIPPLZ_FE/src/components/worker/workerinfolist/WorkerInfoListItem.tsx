import { useNavigate } from 'react-router-dom';

import { CertificatedBadge } from '@/assets/svg/icons';
import NoImage from '@assets/no-image-icon.svg?react';

interface Props {
  worker: any;
}
export default function WorkerInfoListItem({ worker }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-['30%'] bg-zp-white rounded-zp-radius-big cursor-pointer h-[10rem] drop-shadow-zp-slight"
      onClick={() =>
        navigate(
          `/workers/${worker.user_serial}/portfolio?tab=overview&field=${worker.field_name}`
        )
      }
    >
      {worker.img ? (
        <img className="w-full h-[35%] rounded-t-zp-radius-big" src="" />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <NoImage width={180} />
        </div>
      )}
      <div className="flex flex-col w-full p-2">
        <div className="flex items-center gap-2">
          <p className="font-bold text-zp-xs">{worker.user_name}</p>
          <p className="text-zp-2xs text-zp-light-gray">{worker.birth_date}</p>
          {worker.certificated_badge > 0 && (
            <CertificatedBadge width={16} height={16} />
          )}
        </div>
        <p className="text-zp-2xs text-zp-light-gray">{worker.temperature}</p>
        {worker.locations.map((region: string) => (
          <p className="text-zp-2xs text-zp-light-gray">{region}</p>
        ))}
        <p className=" text-zp-3xs">
          {worker.field_name} | &nbsp;경력 {worker.career}년
        </p>
      </div>
    </div>
  );
}
