import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { modifyPlan } from '@apis/scheduler/schedulerApi';

interface Props {
  isOpen: boolean;
  plan: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const customModalStyles: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    maxWidth: '468px',
    minWidth: '350px',
    height: '23rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'center',
    padding: '1.5rem',
    zIndex: 1500,
  },
};
export default function UpdatePlan({ isOpen, setIsOpen, plan }: Props) {
  const closeModal = () => {
    setIsOpen(false);
  };
  const [newName, setNewName] = useState<string>(plan.planName);
  const [memo, setMemo] = useState<string>(plan.sharedContents || '');
  const updatePlan = async (
    planName: string,
    address: string,
    memo: string
  ) => {
    if (plan.planSerial > 0) {
      return await modifyPlan(plan.planSerial, {
        planName: planName,
        address: address,
        sharedContents: memo,
      });
    }
  };
  useEffect(() => {
    console.log(plan);
  }, [isOpen]);
  useEffect(() => {
    // setNewName(plan.planName);
    // setMemo(plan.sharedContents);
    console.log(newName);
    console.log(memo);
  }, [newName, memo]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={150}
        style={customModalStyles}
      >
        <p className="text-center text-zp-lg font-bold">
          계획 정보를 입력해주세요
        </p>
        <div className="w-full flex flex-col  gap-2">
          <p className="text-zp-xs w-[2rem] font-bold">이름</p>
          <Input
            type="text"
            inputType="normal"
            placeholder="계획명을 입력해주세요."
            width="full"
            height={2}
            radius="btn"
            fontSize="xs"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewName((e.target as HTMLInputElement).value);
            }}
            value={newName}
          />
        </div>
        <div>
          <p className="text-zp-xs w-[2rem] font-bold">주소</p>
          <Input
            type="text"
            inputType="normal"
            placeholder="계획명을 입력해주세요."
            width="full"
            height={2}
            radius="btn"
            fontSize="xs"
            value={plan.address}
            additionalStyle="pointer-events-none"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-zp-xs w-[2rem] font-bold">메모</p>
          <Input
            type="text"
            inputType="normal"
            placeholder="공유 메모를 작성해주세요."
            width="full"
            height={2}
            radius="btn"
            fontSize="xs"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMemo((e.target as HTMLInputElement).value);
            }}
            value={memo}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-6">
          <Button
            buttonType="second"
            fontSize="xs"
            radius="btn"
            width={4}
            height={2}
            children="취소"
            onClick={closeModal}
          />
          <Button
            buttonType="primary"
            fontSize="xs"
            radius="btn"
            width={4}
            height={2}
            children="수정"
            onClick={() => {
              updatePlan(newName, plan.address, memo);
              closeModal();
            }}
          />
        </div>
      </Modal>
    </>
  );
}
