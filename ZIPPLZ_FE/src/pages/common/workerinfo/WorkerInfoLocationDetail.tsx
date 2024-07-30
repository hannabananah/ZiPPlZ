import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function WorkerInfoLocationDetail() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(null); // 도시 클릭 시 구역 초기화
  };

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleConfirmClick = () => {
    if (selectedCity && selectedDistrict) {
      // 확인 클릭 시의 로직
      console.log(`Selected Location: ${selectedCity} ${selectedDistrict}`);
    }
  };

  const handleClose = () => {
    navigate('../WorkerInfoList'); // 우측 상단 x 클릭 시 이전 페이지로 돌아가기
  };

  const handleSelectionClick = () => {
    // 선택된 도시와 구역을 초기화
    setSelectedCity(null);
    setSelectedDistrict(null);
  };

  const cityButtons = [
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

  const districtMap = {
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
          <div className="flex-1 text-center font-bold">작업 지역 선택</div>
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
              } focus:outline-none focus:ring-2 `}
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
          {selectedCity && selectedDistrict && (
            <div
              className="flex items-center space-x-2 bg-gray-200 p-2 font-bold text-zp-white bg-zp-main-color rounded-zp-radius-big cursor-pointer"
              onClick={handleSelectionClick}
            >
              <span>
                {selectedCity} {selectedDistrict}
              </span>
            </div>
          )}
        </div>

        {/* 초기화 및 확인 버튼 묶는 div */}
        <div className="flex justify-between mb-4">
          {/* 초기화 버튼 */}
          <div className="font-bold h-20 flex items-center justify-center">
            <button
              className="w-[130px] h-[60px] bg-zp-sub-color rounded-zp-radius-btn"
              onClick={() => {
                setSelectedCity(null);
                setSelectedDistrict(null);
              }}
            >
              초기화
            </button>
          </div>

          {/* 확인 버튼 */}
          <div className="font-bold h-20 flex items-center justify-center">
            <button
              className="w-[410px] h-[60px] bg-zp-main-color rounded-zp-radius-btn text-white"
              onClick={handleConfirmClick}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
