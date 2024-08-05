import { useRef, useState } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { FaFileContract, FaFolderOpen } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { TbWood } from 'react-icons/tb';

import Contract from '@components/chat/Contract';
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

export default function ToggleChatMenu() {
  const { userType } = useUserStore();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      console.log('Files selected:', files);
      console.log('file selected:', file);
    }
  };

  const handleContract = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    },
    {
      id: 5,
      icon: TbWood,
      label: '자재 관리',
      bgColor: '#A2845E',
      role: ['user', 'worker'],
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
        onChange={(e) => {
          const files = e.target.files;
          if (files && files[0]) {
            const file = files[0];
            console.log('Image selected:', file);
          }
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <FullModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        height="60%"
        maxWidth="400px"
      >
        <Contract closeModal={closeModal} />
      </FullModal>
    </div>
  );
}
