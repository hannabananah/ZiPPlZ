import { FaHome, FaRegCalendarCheck, FaUser } from 'react-icons/fa';
import { TiBusinessCard } from 'react-icons/ti';
import { NavLink, useLocation } from 'react-router-dom';

import ActiveCommunity from '@assets/active-community-icon.svg?react';
import ActiveWorker from '@assets/active-worker-icon.svg?react';
import InactiveCommunity from '@assets/inactive-community-icon.svg?react';
import InactiveWorker from '@assets/inactive-worker-icon.svg?react';
import { useUserStore } from '@stores/userStore';

const tabItems = [
  {
    path: '/',
    icon: <FaHome size={30} />,
    label: '홈',
    role: ['user', 'worker'],
  },
  {
    path: '/workers',
    activeIcon: <ActiveWorker />,
    inactiveIcon: <InactiveWorker />,
    label: '시공자 정보',
    role: ['user', 'worker'],
  },
  {
    path: '/schedule/1',
    icon: <FaRegCalendarCheck size={30} />,
    label: '시공일정',
    role: 'user',
  },
  {
    path: '/portfolio',
    icon: <TiBusinessCard size={30} />,
    label: '포트폴리오',
    role: 'worker',
  },
  {
    path: '/community',
    activeIcon: <ActiveCommunity />,
    inactiveIcon: <InactiveCommunity />,
    label: '커뮤니티',
    role: ['user', 'worker'],
  },
  {
    path: '/mypage',
    icon: <FaUser size={30} />,
    label: '마이페이지',
    role: ['user', 'worker'],
  },
];

export default function BottomTab() {
  const location = useLocation();
  const { userType } = useUserStore();

  return (
    <div className="fixed bottom-0 w-full max-w-[600px] bg-zp-white">
      <div className="flex items-center justify-around h-16">
        {tabItems
          .filter(
            (item) =>
              item.role === 'both' ||
              (Array.isArray(item.role)
                ? item.role.includes(userType)
                : item.role === userType)
          )
          .map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center ${
                  isActive || (item.path === '/' && location.pathname === '/')
                    ? 'text-zp-main-color'
                    : 'text-zp-light-gray'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.activeIcon && item.inactiveIcon
                    ? isActive ||
                      (item.path === '/' && location.pathname === '/')
                      ? item.activeIcon
                      : item.inactiveIcon
                    : item.icon}
                  <span
                    className={`text-zp-2xs ${
                      isActive ||
                      (item.path === '/' && location.pathname === '/')
                        ? 'text-zp-main-color'
                        : 'text-zp-light-gray'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
      </div>
    </div>
  );
}
