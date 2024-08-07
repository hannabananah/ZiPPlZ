import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import type { File } from '@/types';
import Circle from '@assets/gradient-circle.svg?react';
import TextArea from '@components/common/TextArea';
import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface TextInputBoxProps {
  isMenuVisible: boolean;
  onMenuToggle: () => void;
  userSerial: number;
  onImageUpload: (file: File) => void;
  type: string;
  imagePreview?: string;
  onImagePreviewRemove: () => void;
}

export default function TextInputBox({
  isMenuVisible,
  onMenuToggle,
  userSerial,
  onImageUpload,
  type,
  imagePreview,
  onImagePreviewRemove,
}: TextInputBoxProps) {
  const [message, setMessage] = useState('');
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('TextInputBox must be used within a WebSocketProvider');
  }
  const { sendMessage } = context;

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (message.trim()) {
        sendMessage(message, userSerial);
        setMessage('');
        e.preventDefault();
      }
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, userSerial);
      setMessage('');
    }
  };

  const handleSendImage = () => {
    if (imagePreview) {
      fetch(imagePreview)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'image.png', { type: 'image/png' });
          sendMessage('', userSerial, file);
          onImagePreviewRemove();
        })
        .catch((error) =>
          console.error('Error creating file from image preview:', error)
        );
    }
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-between w-full gap-3 px-4 my-4 max-h-12 bg-zp-transparent">
      <button className="relative" onClick={onMenuToggle}>
        <Circle width={28} height={28} />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <FaPlus
            size={14}
            style={{
              transform: isMenuVisible ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          />
        </div>
      </button>
      <TextArea
        placeholder="메시지를 입력해주세요."
        className="py-2 overflow-hidden leading-6 align-middle max-h-12"
        fontSize="sm"
        width="full"
        height={10}
        value={message}
        onChange={handleChangeText}
        onKeyDown={handleClickSubmit}
      />

      <button type="button" onClick={handleSendMessage}>
        <FiSend size={20} stroke="#73744A" />
      </button>
      {imagePreview && (
        <button
          type="button"
          onClick={handleSendImage}
          className="flex items-center justify-center w-12 h-12 ml-4 text-white rounded-full bg-zp-primary"
        >
          <FaPlus size={24} />
        </button>
      )}
    </div>
  );
}
