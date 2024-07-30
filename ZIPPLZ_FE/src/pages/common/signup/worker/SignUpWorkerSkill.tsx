import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { setAppElement } from 'react-modal';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

// import value from './../../../../../svg.d';

const skills: string[] = [
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
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}
interface CareerMap {
  [key: string]: number;
}

export default function SignUpWorkerSkill({ setNext, setLink }: Props) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [career, setCareer] = useState<CareerMap>({});
  const handleButtonClick = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills((prev: string[]) =>
        prev.filter((item: string) => item !== skill)
      );
      setCareer((prev) => {
        const newCareer = { ...prev };
        delete newCareer[skill];
        return newCareer;
      });
    } else {
      setSelectedSkills((prev) => [...prev, skill]);
    }
  };
  const handleCareerChange = (skill: string, value: string) => {
    setCareer((prev) => ({
      ...prev,
      [skill]: parseInt(value) || 0,
    }));
  };
  useEffect(() => {
    setLink('/member/login');
    if (selectedSkills.length == 0) {
      setNext(false);
    } else {
      setNext(true);
    }
  }, [selectedSkills]);
  return (
    <>
      <div className="flex flex-col gap-6">
        <p className="font-bold text-zp-2xl">작업 분야 선택</p>
        <div className="grid w-full grid-cols-4 gap-4">
          {skills.map((skill) => (
            <Button
              buttonType={selectedSkills.includes(skill) ? 'primary' : 'normal'}
              height={3.075}
              radius="big"
              fontSize="xl"
              key={skill}
              onClick={() => handleButtonClick(skill)}
              children={skill}
            />
          ))}
        </div>
      </div>
    </>
  );
}
