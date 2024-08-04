import { IoIosClose } from 'react-icons/io';

import NotificationListItem from '@components/notification/NotificationListItem';

interface NotificationModalProps {
  handleCloseNotification: () => void;
}

export default function NotificationModal({
  handleCloseNotification,
}: NotificationModalProps) {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between">
        <h2 className="text-zp-xl font-bold font-noto">알림</h2>
        <span onClick={handleCloseNotification}>
          <IoIosClose size={30} />
        </span>
      </div>
      <NotificationListItem />
    </div>
  );
}
