import { useEffect, useState } from 'react';
import Select from 'react-select';

import { Material } from '@/types';
import { postContract } from '@apis/worker/ContractApi';
import { ContractRequestData } from '@apis/worker/ContractApi';
import { getMaterials } from '@apis/worker/MaterialApi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import multiSelectBoxCustomStyles from '@styles/multiSelectBoxCustomStyles';

interface ContractProps {
  closeContractModal: () => void;
  chatRoomSerial: number;
}

interface Field {
  label: string;
  value: string;
  placeholder: string;
  type: 'input' | 'select';
}

const defaultContractInfo: Field[] = [
  {
    label: '고객 이름',
    value: '',
    placeholder: '내용을 입력해주세요.',
    type: 'input',
  },
  {
    label: '작업 가격',
    value: '',
    placeholder: '내용을 입력해주세요.',
    type: 'input',
  },
  {
    label: '출장 주소',
    value: '',
    placeholder: '내용을 입력해주세요.',
    type: 'input',
  },
  { label: '작업 시작일', value: '', placeholder: 'YYYY-MM-DD', type: 'input' },
  { label: '작업 마감일', value: '', placeholder: 'YYYY-MM-DD', type: 'input' },
  {
    label: '자재',
    value: '',
    placeholder: '내용을 입력해주세요.',
    type: 'select',
  },
];

export default function Contract({
  closeContractModal,
  chatRoomSerial,
}: ContractProps) {
  const [fields, setFields] = useState<Field[]>(defaultContractInfo);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);

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
      startDate:
        fields.find((field) => field.label === '작업 시작일')?.value || '',
      endDate:
        fields.find((field) => field.label === '작업 마감일')?.value || '',
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
            <div key={index} className="flex mb-2 gap-x-3">
              <label className="w-24 font-medium break-keep text-zp-xs">
                {field.label}
              </label>
              {field.type === 'input' ? (
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
                />
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
