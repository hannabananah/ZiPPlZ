import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

// 시공자 리스트로 돌아가기 위한 router

export default function WorkerInfoDateDetail() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null); // 도시 클릭 시 구역 초기화
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  const handleConfirmClick = () => {
    if (selectedCity && selectedDistrict) {
      setSearchText(`${selectedCity} ${selectedDistrict}`);
    }
  };

  const handleClose = () => {
    navigate('../WorkerInfoList'); // 우측 상단 x 클릭 시 이전 페이지로 돌아가기
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
    <>
      <div className="flex justify-between items-center w-full">
        <div className="flex-1 text-center">시공 날짜 선택</div>
        <div className="ml-auto cursor-pointer" onClick={handleClose}>
          <IoIosClose size={40} />
        </div>
        {/* 클릭 시 페이지 이동 */}
      </div>
      <div className="mb-4">시공이 필요한 날짜를 선택해주세요</div>
      <div className="text-zp-gray mb-4">
        선택한 날짜에 작업이 가능한 시공업자를 검색할 수 있어요.
      </div>
      <div className="flex justify-start mb-4">
        <div className="mr-2">선택된 기간</div>
        <div>07.18 ~ 07.26</div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex-1 text-center">작업 지역 선택</div>
      </div>
      <hr className="my-2" />

      <div className="grid grid-cols-4 gap-4 mb-4">
        {cityButtons.map((city, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${
              selectedCity === city
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => handleCityClick(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <hr className="my-2" />

      <div className="grid grid-cols-4 gap-4 mb-4">
        {selectedCity &&
          districtMap[selectedCity].map((district, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                selectedDistrict === district
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => handleDistrictClick(district)}
            >
              {district}
            </button>
          ))}
      </div>

      <hr className="my-2" />

      <div className="flex flex-wrap mb-4">
        {selectedCity && selectedDistrict && (
          <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded">
            <div>
              {selectedCity} {selectedDistrict}
            </div>
            <button
              className="text-red-500"
              onClick={() => {
                setSelectedCity(null);
                setSelectedDistrict(null);
              }}
            >
              <IoIosClose size={30} />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded"
          onClick={() => {
            setSelectedCity(null);
            setSelectedDistrict(null);
          }}
        >
          초기화
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleConfirmClick}
        >
          확인
        </button>
      </div>
    </>
  );
}
