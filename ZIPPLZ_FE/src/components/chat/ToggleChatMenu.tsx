import { useRef } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { FaRegCalendarCheck, FaRegFileAlt } from 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { TbWood } from 'react-icons/tb';

import { useUserStore } from '@store/userStore';

interface MenuItem {
  id: number;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  bgColor: string;
  type: string | string[];
  onClick?: () => void;
}

export default function ToggleChatMenu() {
  const { userType } = useUserStore();

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('Files selected:', files);
    }
  };

  const menus: MenuItem[] = [
    {
      id: 1,
      icon: CiImageOn,
      label: '이미지',
      bgColor: '#75C734',
      type: ['user', 'worker'],
      onClick: handleImageUpload,
    },
    {
      id: 2,
      icon: FaRegFileAlt,
      label: '파일',
      bgColor: '#0697FF',
      type: ['user', 'worker'],
      onClick: handleFileUpload,
    },
    {
      id: 3,
      icon: FaRegCalendarCheck,
      label: '일정 잡기',
      bgColor: '#FF9500',
      type: 'user',
    },
    {
      id: 4,
      icon: FiTool,
      label: 'A/S 신청',
      bgColor: '#FC7FF0',
      type: 'worker',
    },
    {
      id: 5,
      icon: TbWood,
      label: '자재 관리',
      bgColor: '#A2845E',
      type: ['user', 'worker'],
    },
  ];

  return (
    <div className="sticky bottom-0 content-center w-full h-24 border bg-zp-white border-zp-sub-color rounded-t-zp-radius-big">
      <ul className="flex items-center w-11/12 h-full m-auto bg-zp-white justify-evenly">
        {menus
          .filter(
            (menu) =>
              menu.type === 'both' ||
              (Array.isArray(menu.type)
                ? menu.type.includes(userType)
                : menu.type === userType)
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
        onChange={handleFileChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}
