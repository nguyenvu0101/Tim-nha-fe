import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import postReducer from './postSlide';
import locationReducer from './locationSlice';
export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    post: postReducer,
    location: locationReducer,
  },
});
