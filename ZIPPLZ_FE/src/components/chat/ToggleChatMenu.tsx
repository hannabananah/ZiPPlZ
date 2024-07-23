import { CiImageOn } from 'react-icons/ci';
import { FaRegCalendarCheck, FaRegFileAlt } from 'react-icons/fa';
import 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { TbWood } from 'react-icons/tb';

import useUserStore from '@store/userStore';

export default function ToggleChatMenu() {
  const { userType } = useUserStore();
  const menus = [
    {
      id: 1,
      icon: CiImageOn,
      label: '이미지',
      bgColor: '#75C734',
      type: ['user', 'worker'],
    },
    {
      id: 2,
      icon: FaRegFileAlt,
      label: '파일',
      bgColor: '#0697FF',
      type: ['user', 'worker'],
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

  const handleChatMenuClick = (menuId: number) => {
    console.log(`${menuId}번을 클릭`);
  };

  return (
    <div className="sticky bottom-0 content-center w-full h-20 border bg-zp-white border-zp-sub-color rounded-t-zp-radius-big">
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
              className="flex flex-col items-center gap-1"
              onClick={() => handleChatMenuClick(menu.id)}
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
    </div>
  );
}
