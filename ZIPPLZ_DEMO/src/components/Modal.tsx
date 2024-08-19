import React from "react";
import "./Modal.scss"; // 모달의 스타일을 정의할 CSS 파일을 추가해야 합니다.

interface ModalProps {
  imageSrc: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageSrc, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Mask" className="modal-image" />
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;