import React from 'react';

import './Modal.scss';

interface ModalProps {
  imageSrc: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageSrc, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Mask" className="modal-image" />
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
