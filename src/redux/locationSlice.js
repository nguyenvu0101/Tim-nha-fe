import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  province: '',
  district: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setProvince: (state, action) => {
      state.province = action.payload;
      state.district = ''; // Reset district khi tỉnh thay đổi
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },
  },
});

export const { setProvince, setDistrict } = locationSlice.actions;
export default locationSlice.reducer;
