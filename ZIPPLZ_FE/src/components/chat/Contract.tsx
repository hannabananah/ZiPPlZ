import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

interface ContractProps {
  closeModal: () => void;
}

interface Field {
  label: string;
  value: string;
}

const defaultContractInfo = [
  { label: '고객 이름', value: '' },
  { label: '작업 가격', value: '' },
  { label: '출장 주소', value: '' },
  { label: '작업 기간', value: '' },
  { label: '자재', value: '' },
];

export default function Contract({ closeModal }: ContractProps) {
  const [fields, setFields] = useState<Field[]>(defaultContractInfo);

  const handleAddField = () => {
    setFields([...fields, { label: '', value: '' }]);
  };

  const handleFieldChange = (
    index: number,
    key: 'label' | 'value',
    value: string
  ) => {
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setFields(newFields);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Submitted', fields);
    closeModal();
  };

  const handleReset = () => {
    setFields(defaultContractInfo);
  };

  return (
    <div className="w-full p-4 bg-zp-white">
      <h2 className="font-bold text-center text-zp-2xl">계약서</h2>
      <form
        className="flex flex-col justify-between h-full pt-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start">
          <div className="mb-3 overflow-y-auto max-h-60">
            {fields.map((field, index) => (
              <div key={index} className="flex mb-2 overflow-y-auto gap-x-3">
                <label className="block text-sm font-medium">
                  <Input
                    type="text"
                    inputType="none"
                    placeholder="Enter label"
                    value={field.label}
                    onChange={(e) =>
                      handleFieldChange(index, 'label', e.target.value)
                    }
                    radius="none"
                    width={8}
                    fontSize="sm"
                    height={2}
                  />
                </label>
                <Input
                  type="text"
                  inputType="normal"
                  placeholder="내용을 입력해주세요."
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, 'value', e.target.value)
                  }
                  fontSize="sm"
                  radius="btn"
                  height={2}
                  width="full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full mx-auto cursor-pointer">
            <FiPlusCircle size={32} onClick={handleAddField} />
          </div>
        </div>
        <div className="flex gap-2 pb-8">
          <Button
            type="button"
            buttonType="second"
            width="full"
            height={2.5}
            fontSize="xl"
            radius="btn"
            onClick={closeModal}
          >
            취소
          </Button>
          <Button
            type="reset"
            buttonType="normal"
            width="full"
            height={2.5}
            fontSize="xl"
            radius="btn"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            type="submit"
            buttonType="primary"
            width="full"
            height={2.5}
            fontSize="xl"
            radius="btn"
          >
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
