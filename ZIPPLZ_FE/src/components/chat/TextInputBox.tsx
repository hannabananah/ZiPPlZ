import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';

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
  fileData?: { name: string; type: string; url: string };
}

export default function TextInputBox({
  isMenuVisible,
  onMenuToggle,
  userSerial,
  imageSrc,
  onImagePreviewRemove,
  fileData,
  type,
}: TextInputBoxProps) {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('TextInputBox must be used within a WebSocketProvider');
  }

  const { sendMessage } = context;
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (imageSrc || fileData) {
      onMenuToggle();
    }
  }, [imageSrc, fileData, onMenuToggle]);

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, userSerial);
      setMessage('');
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
      />
      {imageSrc && (
        <div className="absolute bg-white border rounded w-18 max-w-24 right-20 bottom-14 border-zp-light-gray z-4">
          <img src={imageSrc} alt="Preview" className="w-full h-auto" />
          <button
            onClick={onImagePreviewRemove}
            className="absolute top-0 right-0"
          >
            <IoIosClose size={20} />
          </button>
        </div>
      )}
      {fileData && (
        <div className="absolute bg-white border rounded w-18 max-w-24 right-20 bottom-14 border-zp-light-gray z-4">
          <div className="p-2">
            <p className="text-sm">{fileData.name}</p>
            <a
              href={fileData.url}
              download={fileData.name}
              className="text-blue-600"
            >
              Download
            </a>
          </div>
        </div>
      )}
      <button onClick={handleSendMessage} className="p-2 cursor-pointer">
        <FiSend size={20} />
      </button>
    </div>
  );
}
