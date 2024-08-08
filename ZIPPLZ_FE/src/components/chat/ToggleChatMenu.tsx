import { useRef, useState } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { FaFileContract, FaFolderOpen } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { TbWood } from 'react-icons/tb';

import AfterService from '@components/chat/AfterService';
import Contract from '@components/chat/Contract';
import Material from '@components/chat/Material';
import FullModal from '@components/common/FullModal';
import { useUserStore } from '@stores/userStore';

interface MenuItem {
  id: number;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  bgColor: string;
  role: string | string[];
  onClick?: () => void;
}

interface ToggleChatMenuProps {
  setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function ToggleChatMenu({
  setImagePreview,
}: ToggleChatMenuProps) {
  const { userType } = useUserStore();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isAfterServiceModalOpen, setIsAfterServiceModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          setImagePreview(imageData);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File selected:', event.target.files?.[0]);
  };

  const handleAfterService = () => {
    setIsAfterServiceModalOpen(true);
  };

  const handleContract = () => {
    setIsContractModalOpen(true);
  };

  const handleMaterial = () => {
    setIsMaterialModalOpen(true);
  };

  const closeAfterServiceModal = () => {
    setIsAfterServiceModalOpen(false);
  };

  const closeContractModal = () => {
    setIsContractModalOpen(false);
  };

  const closeMaterialModal = () => {
    setIsMaterialModalOpen(false);
  };

  const menus: MenuItem[] = [
    {
      id: 1,
      icon: CiImageOn,
      label: '이미지',
      bgColor: '#75C734',
      role: ['user', 'worker'],
      onClick: handleImageUpload,
    },
    {
      id: 2,
      icon: FaFolderOpen,
      label: '파일',
      bgColor: '#0697FF',
      role: ['user', 'worker'],
      onClick: handleFileUpload,
    },
    {
      id: 3,
      icon: FaFileContract,
      label: '계약서',
      bgColor: '#FF9500',
      role: 'worker',
      onClick: handleContract,
    },
    {
      id: 4,
      icon: FiTool,
      label: 'A/S 신청',
      bgColor: '#FC7FF0',
      role: 'user',
      onClick: handleAfterService,
    },
    {
      id: 5,
      icon: TbWood,
      label: '자재 관리',
      bgColor: '#A2845E',
      role: ['user', 'worker'],
      onClick: handleMaterial,
    },
  ];

  return (
    <div className="sticky bottom-0 content-center w-full h-24 border bg-zp-white border-zp-sub-color rounded-t-zp-radius-big">
      <ul className="flex items-center w-11/12 h-full m-auto bg-zp-white justify-evenly">
        {menus
          .filter(
            (menu) =>
              menu.role === 'both' ||
              (Array.isArray(menu.role)
                ? menu.role.includes(userType)
                : menu.role === userType)
          )
          .map((menu) => (
            <li
              key={menu.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => menu.onClick && menu.onClick()}
            >
              <div
                style={{ backgroundColor: menu.bgColor }}
                className="flex items-center justify-center w-11 h-11 aspect-square rounded-zp-radius-full"
              >
                <menu.icon
                  size={26}
                  style={{
                    stroke: menu.id >= 4 ? 'white' : undefined,
                    fill: menu.id < 4 ? 'white' : undefined,
                  }}
                />
              </div>
              <span className="font-bold text-zp-2xs">{menu.label}</span>
            </li>
          ))}
      </ul>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <FullModal
        isOpen={isAfterServiceModalOpen}
        onRequestClose={closeAfterServiceModal}
        height="60%"
        maxWidth="400px"
      >
        <AfterService closeAfterServiceModal={closeAfterServiceModal} />
      </FullModal>

      <FullModal
        isOpen={isContractModalOpen}
        onRequestClose={closeContractModal}
        height="60%"
        maxWidth="400px"
      >
        <Contract closeContractModal={closeContractModal} />
      </FullModal>

      <FullModal
        isOpen={isMaterialModalOpen}
        onRequestClose={closeMaterialModal}
        height="80%"
        maxWidth="400px"
      >
        <Material closeMaterialModal={closeMaterialModal} />
      </FullModal>
    </div>
  );
}
