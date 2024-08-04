import { useState } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import FullModal from '@components/common/FullModal';
import NotificationModal from '@components/notification/NotificationModal';

export default function Header() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenAlert = () => {
    setIsAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className="items-center h-14 bg-zp-transparent flex justify-between">
      <Button
        children="zip-plz"
        buttonType="light"
        fontSize="2xl"
        type="button"
        onClick={() => navigate('/')}
        fontFamily="metamorphous"
        radius="none"
      />
      <button onClick={handleOpenAlert}>
        <FaRegBell size={24} />
      </button>
      <FullModal isOpen={isAlertOpen} onRequestClose={handleCloseAlert}>
        <NotificationModal handleCloseAlert={handleCloseAlert} />
      </FullModal>
    </div>
  );
}
