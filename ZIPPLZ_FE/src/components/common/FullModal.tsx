import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

export default function FullModal({
  isOpen,
  onRequestClose,
  children,
}: ModalProps) {
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
      className="flex rounded-zp-radius-big bg-zp-white h-[94%] overflow-hidden m-auto drop-shadow-zp-normal"
      appElement={document.getElementById('root') || undefined}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
}
