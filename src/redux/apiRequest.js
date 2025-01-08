import axios from 'axios';
// import { loginFailed, loginStart, loginSuccess } from './authSlice';
import { registerStart, registerSuccess, registerFailed } from './authSlice';
import { postStart , postsSuccess , postFailed } from './postSlide';
// export const loginUser = async (user, dispatch, navigate) => {
//   dispatch(loginStart());
//   try {
//     const res = axios.post('http://localhost:3003/auth/login', user);
//       dispatch(loginSuccess(res.data));
//     navigate('/home');
//   } catch (err) {
//     dispatch(loginFailed());
//   }
// };
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = axios.post('http://localhost:3003/auth/register', user);
    dispatch(registerSuccess(res.data));
    navigate('/login');
  } catch (err) {
    dispatch(registerFailed());
  }
};
export const postContent = async (post, dispatch, navigate) => {
  dispatch(postStart());
  try {
    const res = axios.post('http://localhost:3003/post', post);
     dispatch(postsSuccess(res.data));
  } catch (err) {
    dispatch(postFailed());
  }
}