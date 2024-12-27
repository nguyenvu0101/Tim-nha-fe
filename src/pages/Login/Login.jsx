// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { loginUser} from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';
import axios from 'axios';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (user, dispatch, navigate) => {
    try {
      const res = await axios.post('http://localhost:3003/auth/login', user);
      const id = res.data._id;
      const username = res.data.username;
      dispatch(loginSuccess(res.data));
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username',username);
       localStorage.setItem('email', res.data.email);
      localStorage.setItem('id', id);
      navigate(`/home/${id}`);
    } catch (res) {
      if (res.status === 404) {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
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

          {/* Thêm thẻ <p> nằm dưới ô input password */}
          <div className="register-link">
            <a href="/register">
              <p>Chưa có tài khoản ? Đăng ký</p>
            </a>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
