import { CgProfile } from 'react-icons/cg';
import { MdElectricalServices } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { WorkerInfo } from '@pages/common/workerinfo/FindWorkerList';

// 시공자 정보를 가져오기 위해 Portfolio 인터페이스 가져오기
// import { Portfolio, getPortfolio } from '@apis/worker/PortfolioApi';

// worker의 포트폴리오 연변(portfolioSerial), 공종(fieldId), 경력(career) 변수
// const [worker, setWorker] = useState<Worker | null>(null);

// // worker의 시도/구군 정보 변수
// interface Sido {
//   sidoCode: number;
//   sidoName: string;
// }
// interface Gugun {
//   gugunCode: number;
//   sidoCode: number;
//   gugunName: string;
// }

// interface location {
//   sidoCode: number;
//   gugunCode: number;
//   localName: string;
// }

// interface Props {
//   setPortfolio: React.Dispatch<React.SetStateAction<Portfolio>>;
// }

// { setPortfolio }: Props
interface Props {
  worker: WorkerInfo;
}
export default function WorkerInfoListItem({ worker }: Props) {
  // 동적으로 변하는 값들 useState로 정의
  // // 이름, 년생, 온도, 지역, 공종, 경력
  // const [name, setName] = useState<string>('이가은');
  // const [birthDate, setBirthDate] = useState<string>('1999년생');
  // const [temp, setTemp] = useState<number>(36.5);
  // const [sidoList, setSidoList] = useState<Sido[]>([]);
  // const [guguns, setGuguns] = useState<Gugun[]>([]);
  // const [fieldId, setFieldId] = useState<string>('전기');
  // const [career, setCareer] = useState<number>(3);

  // const fetchGugun = async (sidoCode: number) => {
  //   try {
  //     const response = await getGugun(sidoCode);
  //     setGuguns(response.data.data);
  //   } catch (error) {
  //     console.error('Error fetching Gugun list: ', error);
  //   }
  // };

  const navigate = useNavigate();
  return (
    <div
      className="p-2 rounded-zp-radius-big border border-zp-light-beige shadow-lg flex flex-col items-center"
      onClick={() => navigate('/OverView')}
    >
      {/* 사진 파일 */}
      <div className="flex items-center justify-center">
        <CgProfile size={93} />
        {worker && <img src={worker.img} alt="Profile" />}
      </div>
      <div className="flex flex-col items-start px-2">
        {/* 이름 + 나이 + 공종 아이콘 */}
        <div className="flex items-center space-x-2 mb-2">
          {/* 이가은 */}
          <div className="text-left font-bold text-zp-sm">
            {worker && worker.name}
          </div>
          {/* 1999년생 */}
          <div className="text-zp-2xs text-zp-gray">
            {worker && worker.birth_date}
          </div>
          <MdElectricalServices />
        </div>
        {/* 온도: 36.5 */}
        <div className="text-zp-2xs">{worker && `${worker.temp}°C`}</div>
        {/* 지역: 서울시 강남구, 서울시 서초구, 제주 서귀포시, 경기 포천시, 전북 익산시 */}
        <div className="text-zp-2xs bg-zp-main-color mb-2">
          {worker && <div>{worker.locations}</div>}
        </div>
        {/* 공종(전기)) + 경력(경력 3년) */}
        <div className="space-x-2">
          <span className="text-zp-2xs font-bold text-left">
            {worker && worker.field_id}
          </span>
          <span className="text-zp-2xs">
            {worker && `경력 ${worker.career}년`}
          </span>
        </div>
      </div>
    </div>
  );
}
