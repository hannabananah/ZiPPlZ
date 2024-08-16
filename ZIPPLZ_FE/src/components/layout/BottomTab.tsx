import { FaHome, FaRegCalendarCheck, FaUser } from 'react-icons/fa';
import { TiBusinessCard } from 'react-icons/ti';
import { NavLink, useLocation } from 'react-router-dom';

import ActiveCommunity from '@assets/active-community-icon.svg?react';
import ActiveWorker from '@assets/active-worker-icon.svg?react';
import InactiveCommunity from '@assets/inactive-community-icon.svg?react';
import InactiveWorker from '@assets/inactive-worker-icon.svg?react';
import { useLoginUserStore } from '@stores/loginUserStore';

// import OverView from './../../pages/worker/tabs/OverView';

export default function BottomTab() {
  const location = useLocation();
  const { loginUser } = useLoginUserStore();
  const tabItems = [
    {
      path: '/',
      icon: <FaHome size={26} />,
      label: '홈',
      role: ['customer', 'worker', ''],
    },
    {
      path: '/workers/portfolios?type=전체',
      activeIcon: <ActiveWorker width={26} />,
      inactiveIcon: <InactiveWorker width={26} />,
      label: '시공자 정보',
      role: ['customer', 'worker', ''],
    },
    {
      path: loginUser?.role !== '' ? '/schedule' : '/member/login',
      icon: <FaRegCalendarCheck size={26} />,
      label: '시공일정',
      role: ['customer', ''],
    },
    {
      path: `workers/${loginUser?.userSerial}/portfolio?tab=overview`,
      icon: <TiBusinessCard size={26} />,
      label: '포트폴리오',
      role: ['worker'],
    },
    {
      path: '/community',
      activeIcon: <ActiveCommunity width={28} />,
      inactiveIcon: <InactiveCommunity width={28} />,
      label: '커뮤니티',
      role: ['customer', 'worker', ''],
    },
    {
      path: loginUser?.role !== '' ? '/mypage' : '/member/login',
      icon: <FaUser size={26} />,
      label: '마이페이지',
      role: ['customer', 'worker', ''],
    },
  ];
  return (
    <div className="fixed bottom-0 w-full max-w-[600px] bg-zp-white z-30">
      <div className="flex items-center justify-around h-16">
        {tabItems
          .filter((item) =>
            Array.isArray(item.role)
              ? item.role.includes(loginUser?.role || '')
              : item.role === loginUser?.role
          )
          .map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-y-1 ${
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
