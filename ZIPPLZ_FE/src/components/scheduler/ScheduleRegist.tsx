import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Selectbar from '@/components/common/Selectbar';

const options: string[] = [
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
];
export default function ScheduleRegist() {
  const [isRegist, setIsRegist] = useState<boolean>(false);
  const [isNormalScehdule, setIsNormalSchedule] = useState<boolean>(false);
  const [isPrivateSchedule, setIsPrivateSchedule] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const handleClickPlus = function () {
    setIsRegist(true);
  };
  const handleClickNormal = function () {
    setIsRegist(false);
    setIsNormalSchedule(true);
  };
  const handleClickPrivate = function () {
    setIsRegist(false);
    setIsPrivateSchedule(true);
  };
  return (
    <div>
      {!isRegist ? (
        <FiPlusCircle size={32} onClick={handleClickPlus} />
      ) : !isNormalScehdule && !isPrivateSchedule ? (
        <div className="flex justify-center w-full items-center gap-4">
          <Button
            buttonType="primary"
            children="메인 시공"
            fontSize="xs"
            radius="btn"
            width={5}
            height={1.5}
            onClick={handleClickNormal}
          />
          <Button
            buttonType="second"
            children="개인 시공"
            fontSize="xs"
            radius="btn"
            width={5}
            height={1.5}
            onClick={handleClickPrivate}
          />
        </div>
      ) : isNormalScehdule ? (
        <Selectbar
          backgroundColor="white"
          selectedValue="시공을 선택해주세요."
          setSelectedValue={setSelectedValue}
          fontColor="black"
          fontSize="xl"
          border="none"
          hover="sub"
          radius="btn"
          width="full"
          height={2}
          options={options}
        />
      ) : (
        <Input
          placeholder="시공 이름을 입력해주세요."
          type="text"
          inputType="normal"
          height={3}
          radius="btn"
          width="full"
          fontSize="xl"
        />
      )}
    </div>
  );
}
