import React from 'react';
import '../style/ConfirmModal.css';

export default function ConfirmModal({ show, onClose, onConfirm }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>참가를 취소하시겠습니까?</h2>
        <div className="modal-buttons">
          <button onClick={onClose}>아니오</button>
          <button onClick={onConfirm}>네, 취소할게요</button>
        </div>
      </div>
    </div>
  );
}
