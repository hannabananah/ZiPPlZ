import { useState } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import FullModal from '@components/common/FullModal';
import NotificationModal from '@components/notification/NotificationModal';

export default function Header() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenNotification = () => {
    setIsNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <div className="fixed flex items-center justify-between h-14 bg-zp-light-beige px-7 max-w-[600px] w-full z-30">
      <Button
        children="zip-plz"
        buttonType="light"
        fontSize="2xl"
        type="button"
        onClick={() => navigate('/')}
        fontFamily="metamorphous"
        radius="none"
      />
      <button onClick={handleOpenNotification}>
        <FaRegBell size={24} />
      </button>
      <FullModal
        isOpen={isNotificationOpen}
        onRequestClose={handleCloseNotification}
      >
        <NotificationModal handleCloseNotification={handleCloseNotification} />
      </FullModal>
    </div>
  );
}
