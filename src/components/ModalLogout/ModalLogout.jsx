import React from 'react';
import './ModalLogout.css';
const LogoutModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Bạn có chắc muốn đăng xuất?</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm}>
            <a href="/">Đồng ý</a>
          </button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;