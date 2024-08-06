import { useState } from 'react';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import TextArea from '@components/common/TextArea';

interface AfterServiceProps {
  closeAfterServiceModal: () => void;
}

export default function AfterService({
  closeAfterServiceModal,
}: AfterServiceProps) {
  const [fields, setFields] = useState({
    startDate: '',
    endDate: '',
    desiredPrice: '',
    memo: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    closeAfterServiceModal();
  };

  const handleReset = () => {
    setFields({
      startDate: '',
      endDate: '',
      desiredPrice: '',
      memo: '',
    });
  };

  return (
    <div className="w-full p-4 bg-zp-white">
      <h2 className="font-bold text-center text-zp-2xl">
        "유저이름"님께 작업을 요청하세요.
      </h2>
      <form
        className="flex flex-col justify-between h-full pt-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            inputType="normal"
            name="startDate"
            placeholder="시작 날짜: YYYY-MM-DD"
            value={fields.startDate}
            onChange={handleChange}
            width="full"
            height="2.5rem"
            fontSize="sm"
            radius="btn"
            maxLength={10}
          />
          <Input
            type="text"
            inputType="normal"
            name="endDate"
            placeholder="종료 날짜: YYYY-MM-DD"
            value={fields.endDate}
            onChange={handleChange}
            width="full"
            height="2.5rem"
            fontSize="sm"
            radius="btn"
            maxLength={10}
          />
          <Input
            type="number"
            inputType="normal"
            name="desiredPrice"
            placeholder="희망 가격: 숫자만 입력하세요."
            value={fields.desiredPrice}
            onChange={handleChange}
            width="full"
            height="2.5rem"
            fontSize="sm"
            radius="btn"
            min={0}
          />
          <TextArea
            name="memo"
            placeholder="메모: 시공업자에게 요청 사항을 적어주세요."
            value={fields.memo}
            onChange={handleChange}
            width="full"
            height={14}
            fontSize="sm"
          />
        </div>
        <div className="flex gap-2 pb-8 mt-4">
          <Button
            type="button"
            buttonType="second"
            width="full"
            height={2.5}
            fontSize="xl"
            radius="btn"
            onClick={closeAfterServiceModal}
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
