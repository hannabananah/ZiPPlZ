import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';

import FieldListItem from '@/components/home/FieldListItem';
import Input from '@components/common/Input';

import WorkerInfoList from './WorkerInfoList';

const fields: string[] = [
  '전체',
  '철거',
  '설비',
  '샷시',
  '목공',
  '전기',
  '욕실',
  '타일',
  '마루',
  '도배',
  '가구',
  '기타',
];
export default function Workers() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const type: string | null = queryParam.get('type');
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col items-center mt-[3rem] gap-4 p-6">
        <p className="font-bold text-center text-zp-lg">전문 시공자 둘러보기</p>

        {/* 공종 선택 버튼 리스트 임시로 만듦 */}
        <div
          className="flex w-full gap-2 overflow-x-scroll flex-nowrap"
          style={{
            scrollbarWidth: 'none' /* For Firefox */,
            msOverflowStyle: 'none' /* For Internet Explorer and Edge */,
          }}
        >
          {fields.map((field) => (
            <div className="flex-shrink-0 w-1/6">
              <FieldListItem
                field={field}
                handlClickField={() => navigate(`/workers?type=${field}`)}
              />
            </div>
          ))}
        </div>

        {/* 정렬 버튼 */}
        {/* 검색 입력 필드 */}
        <div className="relative flex flex-col items-center w-full">
          <Input
            placeholder="시공업자의 이름을 입력하세요."
            inputType="login"
            type="text"
            width="70%"
            height={1.8}
            fontSize="xs"
            radius="none"
            value={inputValue}
            onChange={handleInputChange} // `onChange` 핸들러 추가
            additionalStyle="text-center relative"
          />
          <HiMagnifyingGlass
            className="absolute left-[15%] top-[0.45rem]"
            onClick={() => alert('검색')}
          />
          <div className="flex items-end justify-end w-full">정렬</div>
        </div>
        {type ? (
          <div className="w-full">
            {type === '전체' ? (
              <WorkerInfoList />
            ) : (
              <WokerInfoList field={fields.indexOf(type)} />
            )}
          </div>
        ) : (
          <p>타입이 없다.</p>
        )}
      </div>
    </>
  );
}
