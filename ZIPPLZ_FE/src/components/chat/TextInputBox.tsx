import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import Circle from '@assets/gradient-circle.svg?react';
import TextArea from '@components/common/TextArea';
import { WebSocketContext } from '@utils/socket/WebSocketProvider';

type TextInputBoxType = 'TALK' | 'IMAGE' | 'FILE';

interface TextInputBoxProps {
  isMenuVisible: boolean;
  onMenuToggle: () => void;
  userSerial: number;
  onImagePreviewRemove: () => void;
  type: TextInputBoxType;
  imageSrc?: string;
}
export default function TextInputBox({
  isMenuVisible,
  onMenuToggle,
  userSerial,
  imageSrc,
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() || imageSrc) {
      // Check for imageSrc
      if (imageSrc) {
        try {
          const response = await fetch(imageSrc);
          const blob = await response.blob();
          const file = new File([blob], 'image.png', { type: 'image/png' });
          sendMessage('', userSerial, file);
          onImagePreviewRemove();
        } catch (error) {
          console.error('Error creating file from image preview:', error);
        }
      } else {
        sendMessage(message, userSerial);
        setMessage('');
      }
    }
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-between w-full gap-3 px-4 my-4 max-h-12 bg-zp-transparent">
      <button className="relative" onClick={onMenuToggle}>
        <Circle width={28} height={28} />
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          style={{
            transform: isMenuVisible ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        >
          <FaPlus size={14} className="min-w-[22px] cursor-pointer" />
        </div>
      </button>
      <TextArea
        placeholder="메시지를 입력하세요."
        className="relative py-2 overflow-hidden leading-6 align-middle max-h-12"
        fontSize="sm"
        width="full"
        height={10}
        value={message}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      >
        {imageSrc && (
          <div className="absolute z-50 w-20 p-2 bg-white border border-gray-300 rounded shadow top-1/2 left-1/2 bg-zp-red">
            <img src={imageSrc} alt="Preview" className="w-full h-auto" />
            <button
              onClick={onImagePreviewRemove}
              className="absolute top-0 right-0 p-1 text-white bg-black bg-opacity-50 rounded"
            >
              ×
            </button>
          </div>
        )}
      </TextArea>
      <button onClick={handleSendMessage} className="p-2 cursor-pointer">
        <FiSend size={22} />
      </button>
    </div>
  );
}
