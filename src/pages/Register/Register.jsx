import React, { useState } from 'react';
import './Register.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/apiRequest';

function Register() {
  // State lưu trữ dữ liệu form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Thêm state cho email
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false); // State cho checkbox đồng ý
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hàm xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Email không hợp lệ');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    if (!agree) {
      setErrorMessage('Bạn phải đồng ý với điều khoản để tiếp tục.');
      return;
    }

    // Tạo object người dùng mới
    const newUser = {
      username: username,
      email: email, // Thêm email vào object
      password: password,
    };

    // Gửi yêu cầu đăng ký
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Tài khoản</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên tài khoản của bạn"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={() => {
                setAgree(!agree);
                setErrorMessage('');
              }}
            />
            <label htmlFor="agree">
              Tôi đồng ý với <a href="/dieu-khoan">điều khoản sử dụng</a>
            </label>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
