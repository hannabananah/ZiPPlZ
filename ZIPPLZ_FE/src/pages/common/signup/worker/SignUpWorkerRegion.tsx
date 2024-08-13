import React, { useEffect, useState } from 'react';

import { Worker } from '@apis/member/MemberApi';
import { getGugun, getSido } from '@apis/member/MemberApi';
import Button from '@components/common/Button';

interface Sido {
  sidoCode: number;
  sidoName: string;
}
interface Gugun {
  gugunCode: number;
  sidoCode: number;
  gugunName: string;
}
interface location {
  sidoCode: number;
  gugunCode: number;
  localName: string;
}
interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setWorker: React.Dispatch<React.SetStateAction<Worker>>;
  phrase: string;
}
export default function SignUpWorkerRegion({
  setNext,
  setLink,
  setWorker,
  phrase,
}: Props) {
  const [sidoList, setSidoList] = useState<Sido[]>([]);
  const [guguns, setGuguns] = useState<Gugun[]>([]);
  const [selectedSido, setSelectedSido] = useState<number>(-1);
  const [selectedLocation, setSelectedLocation] = useState<location[]>([]);
  const fetchSido = async () => {
    try {
      const response = await getSido();
      setSidoList(response.data.data);
    } catch (error) {
      console.error('Error fetching Sido list: ', error);
    }
  };
  const fetchGugun = async (sidoCode: number) => {
    try {
      const response = await getGugun(sidoCode);
      setGuguns(response.data.data);
    } catch (error) {
      console.error('Error fetching Gugun list: ', error);
    }
  };
  useEffect(() => {
    fetchSido();
  }, []);
  useEffect(() => {
    if (selectedSido > 0) fetchGugun(selectedSido);
  }, [selectedSido]);
  const handleButtonClick = (sidoCode: number) => {
    setSelectedSido(sidoCode);
  };
  const [isFull, setIsFull] = useState<boolean>(false);

  const handleGugunClick = (gugun: Gugun) => {
    const sidoName = sidoList[gugun.sidoCode - 1].sidoName;
    setSelectedLocation((prev: location[]) => {
      if (prev.some((loc) => loc.gugunCode === gugun.gugunCode)) {
        return prev.filter((l: location) => l.gugunCode !== gugun.gugunCode);
      } else {
        return [
          ...prev,
          {
            sidoCode: gugun.sidoCode,
            gugunCode: gugun.gugunCode,
            localName: `${sidoName} ${gugun.gugunName}`,
          },
        ];
      }
    });
  };
  const handleDeleteClick = (region: location) => {
    setSelectedLocation((prev: location[]) => {
      return prev.filter((l) => l.gugunCode !== region.gugunCode);
    });
  };
  useEffect(() => {
    if (setSelectedLocation.length > 0) setNext(true);
    else setNext(false);
    if (setSelectedLocation.length === 8) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
    if (phrase === 'region') setLink('/member/join/worker/3/skills');
    else setLink('/member/join/worker/3/extraskills');
    setWorker((prev: Worker) => ({
      ...prev,
      locationList: selectedLocation,
    }));
  }, [setSelectedLocation]);
  return (
    <div className="flex flex-col gap-4 overflow-auto mb-[6rem]">
      <p className="font-bold text-zp-xl">
        작업 가능한 지역을 모두 선택해주세요.
      </p>
      <div className="grid w-full grid-cols-4 gap-4">
        {sidoList && sidoList.length > 0 ? (
          sidoList.map((item) => (
            <Button
              buttonType={
                selectedSido > 0 && selectedSido === item.sidoCode
                  ? 'second'
                  : 'normal'
              }
              height={3.075}
              radius="big"
              fontSize="xl"
              key={item.sidoCode}
              onClick={() => handleButtonClick(item.sidoCode)}
              children={item.sidoName}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {selectedSido > 0 && (
        <>
          <hr className="text-zp-light-gray" />
          <div className="grid w-full grid-cols-4 gap-4">
            {guguns.map((gugun) => (
              <Button
                buttonType={
                  selectedLocation.some(
                    (loc) => loc.gugunCode === gugun.gugunCode
                  )
                    ? 'second'
                    : 'normal'
                }
                height={3.075}
                radius="big"
                fontSize="xl"
                key={gugun.gugunCode}
                onClick={() => handleGugunClick(gugun)}
                children={gugun.gugunName}
                disabled={
                  isFull &&
                  !selectedLocation.some(
                    (loc) => loc.gugunCode === gugun.gugunCode
                  )
                }
              />
            ))}
          </div>
        </>
      )}
      {selectedLocation.length > 0 && (
        <>
          <div className="relative grid w-full grid-cols-4 gap-4 p-4">
            <div className="absolute top-0 left-0 w-full h-[18px] backdrop-blur-lg bg-gradient-to-b from-white to-transparent z-0"></div>
            {selectedLocation.map((location) => (
              <Button
                buttonType="primary" // 또는 원하는 버튼 타입
                height={3}
                radius="big"
                fontSize="xs"
                key={location.localName}
                children={location.localName}
                onClick={() => {
                  handleDeleteClick(location);
                }}
              />
            ))}
            <p className="absolute bottom-0 right-0 text-zp-light-gray text-zp-lg">
              {selectedLocation.length}/8
            </p>
          </div>
        </>
      )}
    </div>
  );
}
