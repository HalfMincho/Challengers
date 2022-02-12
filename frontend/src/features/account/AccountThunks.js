import { createAsyncThunk } from '@reduxjs/toolkit';
import accountSlice from './AccountSlice';
import { postSignUp } from '@api/postSignUp';
import { getAccessToken } from '@utils/helpers/tokensHelper';
import { postSignIn } from '@api/postSignIn';

export const registerThunk = createAsyncThunk('account/register', async (payload, { dispatch }) => {
  const { name, email, emailCode, password } = payload;
  await postSignUp(name, email, emailCode, password);
});

export const loginThunk = createAsyncThunk('account/login', async (payload, { dispatch }) => {
  const { email, password } = payload;
  await postSignIn(email, password);
  dispatch(accountSlice.actions.setLoggedIn());
});

export const logoutThunk = createAsyncThunk('account/logout', async (_, { dispatch }) => {
  await logout();
  dispatch(accountSlice.actions.setLoggedOut());

  // if (response.response !== "OK") {
  //   rejectWithValue(response);
  // } else {
  //   dispatch(accountSlice.actions.setLoggedOut());
  // }
});

export const getUserIdThunk = createAsyncThunk('account/getUserId', async (_, { dispatch }) => {
  const result = await getUserId();
  dispatch(accountSlice.actions.setUserId(result.userId));

  // if (result.response === 'OK') {
  //   dispatch(accountSlice.actions.setUserId(result.data.userId));
  //   return {response: 'OK'};
  // } else {
  //   return result;
  // }
});
