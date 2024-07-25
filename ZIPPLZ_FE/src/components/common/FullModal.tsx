import Modal from 'react-modal';

import ChatRooms from '@components/chat/ChatRooms';

interface modalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const FullModal = ({ isOpen, onRequestClose }: modalProps) => {
  return (
    <Modal
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          maxWidth: '580px',
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
        },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className=" flex   rounded-zp-radius-big bg-zp-white h-[94%] overflow-hidden m-auto"
      shouldCloseOnOverlayClick={true}
    >
      <ChatRooms />
    </Modal>
  );
};

export default FullModal;
