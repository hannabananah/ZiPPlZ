import React, { useEffect, useState } from 'react';

import { getGugun, getSido } from '@/apis/member/MemberApi';
import Button from '@/components/common/Button';
import { regionList } from '@/components/signup/regionData/region.js';

interface Sido {
  sidocode: number;
  sidoName: string;
}
interface Gugun {
  gugunCode: number;
  sidoCode: number;
  gugunName: string;
}
interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}
export default function SignUpWorkerRegion({ setNext, setLink }: Props) {
  const [sidoList, setSidoList] = useState<Sido[]>([]);
  const [guguns, setGuguns] = useState<Gugun[]>([]);
  const [selectedSido, setSelectedSido] = useState<number>(-1);
  const [selectedGugun, setSelectedGugun] = useState<string[]>([]);
  const fetchSido = async () => {
    const response = await getSido();
    setSidoList(response.data);
  };
  const fetchGugun = async (sidoCode: number) => {
    const response = await getGugun(sidoCode);
    setGuguns(response.data);
  };
  useEffect(() => {
    fetchSido();
  }, []);
  useEffect(() => {
    if (selectedSido > 0) fetchGugun(selectedSido);
  }, [selectedSido]);
  useEffect(() => {
    console.log(sidoList);
  }, [sidoList]);
  const handleButtonClick = (idx: number) => {
    setSelectedSido(idx);
  };
  const [isFull, setIsFull] = useState<boolean>(false);

  const handleGugunClick = (gugun: string) => {
    setSelectedGugun((prev: string[]) => {
      if (prev.includes(gugun)) {
        return prev.filter((g: string) => g !== gugun);
      } else {
        return [...prev, gugun];
      }
    });
  };
  const handleDeleteClick = (region: string) => {
    setSelectedGugun((prev: string[]) => {
      return prev.filter((g) => g !== region);
    });
  };
  useEffect(() => {
    if (selectedGugun.length > 0) setNext(true);
    else setNext(false);
    if (selectedGugun.length === 8) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
    setLink('/member/join/worker/3/skills');
  }, [selectedGugun]);
  return (
    // <div className="flex flex-col gap-4 overflow-auto mb-[6rem]">
    //   <p className="text-zp-xl font-bold">
    //     작업 가능한 지역을 모두 선택해주세요.
    //   </p>
    //   <div className="w-full grid grid-cols-4 gap-4">
    //     {regionList.map((item, idx) => (
    //       <Button
    //         buttonType={
    //           selectedSido >= 0 && regionList[selectedSido].sido === item.sido
    //             ? 'second'
    //             : 'normal'
    //         }
    //         height={3.075}
    //         radius="big"
    //         fontSize="xl"
    //         key={item.sido}
    //         onClick={() => handleButtonClick(idx)}
    //         children={item.sido}
    //       />
    //     ))}
    //   </div>
    //   {selectedSido >= 0 && (
    //     <>
    //       <hr className="text-zp-light-gray" />
    //       <div className="w-full grid grid-cols-4 gap-4">
    //         {regionList[selectedSido].guguns.map((gugun) => (
    //           <Button
    //             buttonType={selectedGugun.includes(gugun) ? 'second' : 'normal'}
    //             height={3.075}
    //             radius="big"
    //             fontSize="xl"
    //             key={gugun}
    //             onClick={() => handleGugunClick(gugun)}
    //             children={gugun}
    //             disabled={isFull && !selectedGugun.includes(gugun)}
    //           />
    //         ))}
    //       </div>
    //     </>
    //   )}
    //   {selectedGugun.length > 0 && (
    //     <>
    //       <div className="relative w-full grid grid-cols-4 gap-4 p-4">
    //         <div className="absolute top-0 left-0 w-full h-[18px] backdrop-blur-lg bg-gradient-to-b from-white to-transparent z-0"></div>
    //         {selectedGugun.map((gugun) => (
    //           <Button
    //             buttonType="primary" // 또는 원하는 버튼 타입
    //             height={3}
    //             radius="big"
    //             fontSize="lg"
    //             key={`${regionList[selectedSido].sido} ${gugun}`}
    //             children={`${regionList[selectedSido].sido} ${gugun}`}
    //             onClick={() => {
    //               handleDeleteClick(`${gugun}`);
    //             }}
    //           />
    //         ))}
    //         <p className="text-zp-light-gray text-zp-lg absolute right-0 bottom-0">
    //           {selectedGugun.length}/8
    //         </p>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className="flex flex-col gap-4 overflow-auto mb-[6rem]">
      <p className="text-zp-xl font-bold">
        작업 가능한 지역을 모두 선택해주세요.
      </p>
      <div className="w-full grid grid-cols-4 gap-4">
        {sidoList.map((item, idx) => (
          <Button
            buttonType={
              selectedSido > 0 && sidoList[idx].sidoName === item.sidoName
                ? 'second'
                : 'normal'
            }
            height={3.075}
            radius="big"
            fontSize="xl"
            key={item.sidocode}
            onClick={() => handleButtonClick(item.sidocode)}
            children={item.sidoName}
          />
        ))}
      </div>
      {selectedSido > 0 && (
        <>
          <hr className="text-zp-light-gray" />
          <div className="w-full grid grid-cols-4 gap-4">
            {guguns.map((gugun) => (
              <Button
                buttonType={
                  selectedGugun.includes(gugun.gugunName) ? 'second' : 'normal'
                }
                height={3.075}
                radius="big"
                fontSize="xl"
                key={gugun.gugunCode}
                onClick={() => handleGugunClick(gugun.gugunName)}
                children={gugun.gugunName}
                disabled={isFull && !selectedGugun.includes(gugun.gugunName)}
              />
            ))}
          </div>
        </>
      )}
      {selectedGugun.length > 0 && (
        <>
          <div className="relative w-full grid grid-cols-4 gap-4 p-4">
            <div className="absolute top-0 left-0 w-full h-[18px] backdrop-blur-lg bg-gradient-to-b from-white to-transparent z-0"></div>
            {selectedGugun.map((gugun) => (
              <Button
                buttonType="primary" // 또는 원하는 버튼 타입
                height={3}
                radius="big"
                fontSize="lg"
                key={`${sidoList[selectedSido].sidoName} ${gugun}`}
                children={`${sidoList[selectedSido].sidoName} ${gugun}`}
                onClick={() => {
                  handleDeleteClick(`${gugun}`);
                }}
              />
            ))}
            <p className="text-zp-light-gray text-zp-lg absolute right-0 bottom-0">
              {selectedGugun.length}/8
            </p>
          </div>
        </>
      )}
    </div>
  );
}
