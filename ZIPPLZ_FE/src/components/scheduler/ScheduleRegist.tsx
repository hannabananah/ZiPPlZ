import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import ReactModal from 'react-modal';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Selectbar from '@/components/common/Selectbar';
import { ConstructionData } from '@/pages/user/Schedule';

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
interface Props {
  scheduleList: ConstructionData[];
  setScheduleList: (value: ConstructionData[]) => void;
}
export default function ScheduleRegist({
  scheduleList,
  setScheduleList,
}: Props) {
  const [isRegist, setIsRegist] = useState<boolean>(false);
  const [isNormalScehdule, setIsNormalSchedule] = useState<boolean>(false);
  const [isPrivateSchedule, setIsPrivateSchedule] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] =
    useState<string>('시공을 선택해주세요.');
  const [showRegistPrivateModal, setShowRegistPrivateModal] =
    useState<boolean>(false);
  const [newPrivateSchedule, setNewPrivateSchedule] = useState<string>('');
  const handleClickPlus = function () {
    setIsRegist(true);
  };
  const handleClickNormal = function () {
    setIsNormalSchedule(true);
  };
  const handleClickPrivate = function () {
    setIsPrivateSchedule(true);
  };
  const handleKeyDown = function (e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      setShowRegistPrivateModal(true);
      setNewPrivateSchedule((e.target as HTMLInputElement).value);
    }
  };
  useEffect(() => {
    if (selectedValue !== '시공을 선택해주세요.') {
      setScheduleList((prev: ConstructionData[]) => [
        ...prev,
        { id: prev.length + 1, 시공분야: selectedValue, 스케줄: null },
      ]);
    }
  });
  useEffect(() => {
    console.log(newPrivateSchedule);
  }, [newPrivateSchedule]);
  return (
    <>
      {!isRegist ? (
        <FiPlusCircle size={32} onClick={handleClickPlus} />
      ) : !isNormalScehdule && !isPrivateSchedule ? (
        <div className="w-full flex justify-center w-full items-center gap-4">
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
          selectedValue={selectedValue}
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
          onKeydown={handleKeyDown}
        />
      )}
    </>
  );
}
