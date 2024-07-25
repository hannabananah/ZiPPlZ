import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: string;
}
export default function SignUpHead({ type }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <IoIosArrowRoundBack
          size={27}
          className="text-zp-gray cursor-pointer"
          onClick={() => navigate(-1)}
        />
        {type === 'worker' && (
          <p className="text-zp-light-gray text-zp-2xl cursor-pointer">
            건너뛰기
          </p>
        )}
      </div>
    </>
  );
}
