import React, { useEffect, useState } from 'react';

import { getFields } from '@/apis/member/MemberApi';
import Button from '@/components/common/Button';

interface Field {
  fieldName: string;
  fieldCode: number;
}
interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpWorkerSkill({ setNext, setLink }: Props) {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedFields, setSelectedFields] = useState<Field[]>([]);
  const fetchFields = async () => {
    const response = await getFields();
    setFields(response.data);
  };
  useEffect(() => {
    fetchFields();
  }, []);
  const handleButtonClick = (field: Field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields((prev: Field[]) =>
        prev.filter((item: Field) => item.fieldCode !== field.fieldCode)
      );
    } else {
      setSelectedFields((prev: Field[]) => [...prev, field]);
    }
  };
  useEffect(() => {
    setLink('/member/login');
    if (selectedFields.length == 0) {
      setNext(false);
    } else {
      setNext(true);
    }
  }, [selectedFields]);
  return (
    <>
      <div className="flex flex-col gap-6">
        <p className="text-zp-2xl font-bold">작업 분야 선택</p>
        <div className="w-full grid grid-cols-4 gap-4">
          {fields.map((field) => (
            <Button
              buttonType={selectedFields.includes(field) ? 'primary' : 'normal'}
              height={3.075}
              radius="big"
              fontSize="xl"
              key={field.fieldCode}
              onClick={() => handleButtonClick(field)}
              children={field.fieldName}
            />
          ))}
        </div>
      </div>
    </>
  );
}
