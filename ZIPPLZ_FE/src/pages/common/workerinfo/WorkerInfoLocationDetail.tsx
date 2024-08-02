import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { User, Worker } from '@apis/worker/WorkerApi';
import { getGugun, getSido } from '@apis/worker/WorkerApi';
import Button from '@components/common/Button';

type Location = {
  city: string;
  district: string;
};

// 시도 인터페이스
interface Sido {
  sidoCode: number;
  sidoName: string;
}
// 구군 인터페이스
interface Gugun {
  gugunCode: number;
  sidoCode: number;
  gugunName: string;
}
// 지역 인터페이스
interface location {
  sidoCode: number;
  gugunCode: number;
  localName: string;
}
interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setWorker: React.Dispatch<React.SetStateAction<Worker>>;
}

export default function WorkerInfoLocationDetail() {
  // 유저, worker 정보 가져오기
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    userName: '',
    birthDate: '',
    tel: '',
  });
  const [worker, setWorker] = useState<Worker>({
    userSerial: 0,
    locationList: [],
    fieldList: [],
    businessNumber: '',
    company: '',
    companyAddress: '',
  });

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]); // 선택된 도시와 구역의 배열

  const navigate = useNavigate();
  const maxSelections: number = 8; // 최대 선택 가능한 조합 수

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(null); // 도시 클릭 시 구역 초기화
  };

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);

    if (selectedCity) {
      const location: Location = { city: selectedCity, district };

      setSelectedLocations((prev) => {
        // 이미 선택된 조합이 아닌 경우에만 추가하고 최대 개수를 초과하지 않도록 제한
        if (
          !prev.some(
            (loc) => loc.city === selectedCity && loc.district === district
          ) &&
          prev.length < maxSelections
        ) {
          return [...prev, location];
        }
        return prev;
      });
    }
  };

  const handleConfirmClick = () => {
    if (selectedLocations.length > 0) {
      console.log('Selected Locations:', selectedLocations);
    }
  };

  const handleClose = () => {
    navigate('../WorkerInfoList'); // 우측 상단 x 클릭 시 이전 페이지로 돌아가기
  };

  const handleRemoveLocation = (index: number) => {
    setSelectedLocations((prev) => prev.filter((_, i) => i !== index));
  };

  const cityButtons: string[] = [
    '서울',
    '부산',
    '경기',
    '대전',
    '대구',
    '인천',
    '울산',
    '광주',
    '강원',
    '세종',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];

  const districtMap: { [key: string]: string[] } = {
    서울: ['강남구', '강북구', '강서구'],
    부산: ['강서구', '금정구', '남구'],
    경기: ['수원시', '용인시', '성남시'],
    대전: ['동구', '중구', '서구'],
    대구: ['북구', '달서구', '수성구'],
    인천: ['남동구', '부평구', '연수구'],
    울산: ['중구', '남구', '동구'],
    광주: ['동구', '서구', '남구'],
    강원: ['춘천시', '원주시', '강릉시'],
    세종: ['조치원읍', '한솔동', '나성동'],
    충북: ['청주시', '충주시', '제천시'],
    충남: ['천안시', '공주시', '보령시'],
    전북: ['전주시', '군산시', '익산시'],
    전남: ['목포시', '여수시', '순천시'],
    경북: ['포항시', '경주시', '김천시'],
    경남: ['창원시', '진주시', '통영시'],
    제주: ['제주시', '서귀포시'],
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="ml-5 flex-1 text-center font-bold">
            작업 지역 선택
          </div>
          <IoIosClose
            size={40}
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        {/* 밑줄 */}
        <hr className="p-2 my-2" />

        <div className="grid grid-cols-4 gap-4 mb-4">
          {cityButtons.map((city, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded border ${
                selectedCity === city
                  ? 'rounded-zp-radius-btn bg-zp-sub-color border-zp-main-color'
                  : 'rounded-zp-radius-btn border-zp-main-color'
              } focus:outline-none focus:ring-2`}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </button>
          ))}
        </div>

        {/* 밑줄 */}
        <hr className="p-2 my-2" />

        <div className="grid grid-cols-4 gap-4 mb-4">
          {selectedCity &&
            districtMap[selectedCity].map((district, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded border ${
                  selectedDistrict === district
                    ? 'rounded-zp-radius-btn bg-zp-sub-color border-zp-main-color'
                    : 'rounded-zp-radius-btn border-zp-main-color'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onClick={() => handleDistrictClick(district)}
              >
                {district}
              </button>
            ))}
        </div>

        {/* 밑줄 */}
        <hr className="p-2" />

        <div className="flex flex-wrap mb-4">
          {selectedLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-200 p-2 font-bold text-zp-white bg-zp-main-color rounded-zp-radius-big cursor-pointer mr-2 mb-2"
              onClick={() => handleRemoveLocation(index)}
            >
              <span>
                {location.city} {location.district}
              </span>
            </div>
          ))}
        </div>

        {/* 선택한 조합의 개수 표시 */}
        <div className="font-bold text-zp-lg text-zp-light-gray flex justify-end mb-4">
          <span>
            {selectedLocations.length}/{maxSelections}
          </span>
        </div>

        {/* 초기화 및 확인 버튼 묶는 div */}
        <div className="font-bold space-x-2 first-letter:mb-4 h-20 flex items-center justify-between">
          {/* 초기화 버튼 */}
          <Button
            children="초기화"
            buttonType="second"
            width={8.125}
            height={3.75}
            fontSize="xl"
            radius="btn"
            onClick={() => {
              setSelectedCity(null);
              setSelectedDistrict(null);
              setSelectedLocations([]); // 선택된 지역들 초기화
            }}
          />

          {/* 확인 버튼 */}
          <Button
            children="확인"
            buttonType="primary"
            width={25.625}
            height={3.75}
            fontSize="xl"
            radius="btn"
            onClick={handleConfirmClick}
          />
        </div>
      </div>
    </div>
  );
}
