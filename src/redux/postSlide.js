import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: {
      content: null,
      isFectching: false,
      error: false,
    },
  },
  reducers: {
    postStart: (state) => {
      state.post.isFetching = true;
    },
    postsSuccess: (state, action) => {
        state.post.isFetching = false;
        state.post.content = action.payload;
    },
    postFailed: (state) => {
      state.post.isFetching = false;
      state.post.error = true;
    },
  },
});
export const { postStart, postsSuccess, postFailed } = postSlice.actions;
export default postSlice.reducer;
