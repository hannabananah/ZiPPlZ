import { IoIosClose } from 'react-icons/io';

import NotificationListItem from '@components/notification/NotificationListItem';

interface NotificationModalProps {
  handleCloseAlert: () => void;
}

export default function NotificationModal({
  handleCloseAlert,
}: NotificationModalProps) {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between">
        <h2 className="text-zp-xl font-bold font-noto">알림</h2>
        <span onClick={handleCloseAlert}>
          <IoIosClose size={30} />
        </span>
      </div>
      <NotificationListItem />
    </div>
  );
}
