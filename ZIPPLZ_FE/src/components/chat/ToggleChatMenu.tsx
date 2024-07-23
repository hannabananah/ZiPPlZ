import { CiImageOn } from 'react-icons/ci';
import { FaRegCalendarCheck, FaRegFileAlt } from 'react-icons/fa';
import 'react-icons/fa';
import { FiTool } from 'react-icons/fi';
import { TbWood } from 'react-icons/tb';

export default function ToggleChatMenu() {
  const menus = [
    {
      id: 1,
      icon: CiImageOn,
      label: '이미지',
      bgColor: '#75C734',
      type: 'user',
    },
    {
      id: 2,
      icon: FaRegFileAlt,
      label: '파일',
      bgColor: '#0697FF',
      type: 'user',
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
      type: 'user',
    },
  ];

  const handleChatMenuClick = (menuId: number) => {
    console.log(`${menuId}번을 클릭`);
  };

  return (
    <div className="sticky bottom-0 h-20 w-full bg-zp-white border border-zp-sub-color rounded-t-zp-radius-big content-center">
      <ul className="w-11/12 h-full bg-zp-white flex justify-evenly items-center m-auto">
        {menus.map((menu) => (
          <li
            key={menu.id}
            className="flex flex-col items-center gap-1"
            onClick={() => handleChatMenuClick(menu.id)}
          >
            <div
              style={{ backgroundColor: menu.bgColor }}
              className="w-11 h-11 aspect-square rounded-zp-radius-full flex justify-center items-center"
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
