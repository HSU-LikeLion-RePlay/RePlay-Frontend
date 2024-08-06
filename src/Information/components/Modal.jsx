//모달창
import React from "react";
import "../css/modal.css";

const Modal = ({ isOpen, onClose, onNavigateHome, onNavigateInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="modalcontainer">
      <div className="modal-content">
        <div className="conflict">투고 완료되었습니다.</div>
        <div className="buttons">
          <button onClick={onNavigateHome} className="modal-button">
            홈페이지로 이동
          </button>
          <button onClick={onNavigateInfo} className="modal-button">
            내정보로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
