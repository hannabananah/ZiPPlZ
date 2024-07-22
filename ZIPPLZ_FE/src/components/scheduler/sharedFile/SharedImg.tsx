import React from 'react';

import { ImageDragIcon } from '@/assets/svg/icons';
import Button from '@/components/common/Button';

export default function SharedImg() {
  return (
    <div
      className="flex flex-col bg-zp-white gap-1 justify-center items-center rounded-zp-radius-big"
      style={{ width: '21rem', height: '7rem' }}
    >
      <ImageDragIcon width={48} height={48} />
      <p className="text-zp-xs text-zp-light-gray">공유할 이미지 가져오기</p>
      <Button
        buttonType="normal"
        children="이미지 가져오기"
        width={8}
        height={1.5}
        fontSize="xs"
        radius="btn"
      />
    </div>
  );
}
