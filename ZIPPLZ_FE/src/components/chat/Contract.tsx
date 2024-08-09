import { useEffect, useState } from 'react';
import Select from 'react-select';

import { Material } from '@/types';
import { postContract } from '@apis/worker/ContractApi';
import { ContractRequestData } from '@apis/worker/ContractApi';
import { getMaterials } from '@apis/worker/MaterialApi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import DateInput from '@components/signup/DateInput';
import multiSelectBoxCustomStyles from '@styles/multiSelectBoxCustomStyles';

interface ContractProps {
  closeContractModal: () => void;
  chatRoomSerial: number;
  name: string;
}

interface Field {
  label: string;
  value: string;
  placeholder: string;
  type: 'input' | 'select';
  editable: boolean;
}

export default function Contract({
  closeContractModal,
  chatRoomSerial,
  name,
}: ContractProps) {
  const defaultContractInfo: Field[] = [
    {
      label: '고객 이름',
      value: name,
      placeholder: '내용을 입력해주세요.',
      type: 'input',
      editable: false,
    },
    {
      label: '작업 가격',
      value: '',
      placeholder: '내용을 입력해주세요.',
      type: 'input',
      editable: true,
    },
    {
      label: '출장 주소',
      value: '',
      placeholder: '내용을 입력해주세요.',
      type: 'input',
      editable: true,
    },
    {
      label: '작업 시작일',
      value: '',
      placeholder: 'YYYY/MM/DD',
      type: 'input',
      editable: true,
    },
    {
      label: '작업 마감일',
      value: '',
      placeholder: 'YYYY/MM/DD',
      type: 'input',
      editable: true,
    },
    {
      label: '자재',
      value: '',
      placeholder: '내용을 입력해주세요.',
      type: 'select',
      editable: true,
    },
  ];
  const [fields, setFields] = useState<Field[]>(defaultContractInfo);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getMaterials();
        setMaterials(response.data.data);
      } catch (error) {
        console.error('Failed to fetch materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handlePostContract = async () => {
    const requestData: ContractRequestData = {
      requestComment: '계약서 초안 작성해서 보냅니다.',
      startDate,
      endDate,
      workPrice:
        Number(fields.find((field) => field.label === '작업 가격')?.value) || 0,
      materialList: selectedMaterials.map(
        (material) => material.materialSerial
      ),
    };

    if (chatRoomSerial === undefined) {
      console.error('Invalid chatroomSerial');
      return;
    }

    try {
      const response = await postContract(chatRoomSerial, requestData);
      console.log('계약서 초안 작성 성공:', response.data);
      closeContractModal();
    } catch (error) {
      console.error('계약서 초안 작성 실패:', error);
    }
  };

  const handleFieldChange = (index: number, key: 'value', value: string) => {
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setFields(newFields);
  };

  const handleMaterialChange = (selectedOptions: any) => {
    const selectedMaterials = selectedOptions.map((option: any) => {
      return materials.find(
        (material) => material.materialSerial === option.value
      );
    });

    setSelectedMaterials(selectedMaterials.filter(Boolean) as Material[]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handlePostContract();
  };

  const handleReset = () => {
    setFields(defaultContractInfo);
    setSelectedMaterials([]);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="w-full p-4 bg-zp-white">
      <h2 className="font-bold text-center text-zp-2xl">계약서</h2>
      <form
        className="flex flex-col justify-between h-full pt-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start">
          {fields.map((field, index) => (
            <div key={index} className="flex items-center mb-2 gap-x-3">
              <label className="w-24 break-keep text-zp-xs">
                {field.label}
              </label>
              {field.type === 'input' ? (
                field.label === '작업 시작일' ||
                field.label === '작업 마감일' ? (
                  <DateInput
                    value={field.value}
                    onChange={(date) => handleFieldChange(index, 'value', date)}
                    placeholder={field.placeholder}
                    inputType="normal"
                    radius="btn"
                  />
                ) : (
                  <Input
                    type="text"
                    inputType="normal"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(index, 'value', e.target.value)
                    }
                    fontSize="sm"
                    radius="btn"
                    height={2}
                    width="full"
                    editable={!field.editable}
                  />
                )
              ) : (
                <Select
                  isMulti
                  name="materials"
                  options={materials.map((material) => ({
                    value: material.materialSerial,
                    label: material.materialName,
                  }))}
                  className="w-full basic-multi-select"
                  classNamePrefix="select"
                  styles={multiSelectBoxCustomStyles}
                  value={selectedMaterials.map((material) => ({
                    value: material.materialSerial,
                    label: material.materialName,
                  }))}
                  onChange={handleMaterialChange}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pb-8">
          <Button
            type="button"
            buttonType="second"
            width="full"
            height={2.5}
            fontSize="xl"
            radius="btn"
            onClick={closeContractModal}
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
