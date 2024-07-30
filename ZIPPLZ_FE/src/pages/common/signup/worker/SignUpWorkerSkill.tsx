import React, { useEffect, useState } from 'react';

import { Worker } from '@apis/member/MemberApi';
import { getFields } from '@apis/member/MemberApi';
import Button from '@components/common/Button';

interface Field {
  fieldCode: number;
  fieldName: string;
}
interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setWorker: React.Dispatch<React.SetStateAction<Worker>>;
}

export default function SignUpWorkerSkill({
  setNext,
  setLink,
  setWorker,
}: Props) {
  const [fieldList, setFieldList] = useState<Field[]>([]);
  const [selectedFields, setSelectedFields] = useState<Field[]>([]);
  const fetchFields = async () => {
    try {
      const response = await getFields();
      if (response && response.data) {
        setFieldList(response.data.data);
      } else {
        console.error('No data found in response.');
      }
    } catch (error) {
      console.error('Error fetching fields: ', error);
    }
  };
  useEffect(() => {
    fetchFields();
  }, []);
  useEffect(() => {
    console.log(selectedFields);
  }, [selectedFields]);
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
    setWorker((prev: Worker) => ({
      ...prev,
      fieldList: selectedFields,
    }));
  }, [selectedFields]);
  return (
    <>
      <div className="flex flex-col gap-6">
        <p className="text-zp-2xl font-bold">작업 분야 선택</p>
        {fieldList.length > 0 && (
          <div className="w-full grid grid-cols-4 gap-4">
            {fieldList.map((field) => (
              <Button
                buttonType={
                  selectedFields.includes(field) ? 'primary' : 'normal'
                }
                height={3.075}
                radius="big"
                fontSize="xl"
                key={field.fieldCode}
                onClick={() => handleButtonClick(field)}
                children={field.fieldName}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
