import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userName: '',
  email: '',
};

const accountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userName = '';
    },
    setUserId: (state, action) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export default accountSlice;
