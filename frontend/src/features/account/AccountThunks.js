import { createAsyncThunk } from '@reduxjs/toolkit';
import accountSlice from './AccountSlice';
import { postSignUp } from '@api/postSignUp';
import { postSignIn } from '@api/postSignIn';
import { postRegisterToken } from '@api/postRegisterToken';
import { postVerifyToken } from '@api/postVerifyToken';
import { putUserName } from '@api/putUserName';
import { getUserInfo } from '@api/getUserInfo';
import { putPassword } from '@api/putPassword';

export const registerThunk = createAsyncThunk('account/register', async (payload) => {
  const { name, email, emailCode, password } = payload;
  await postSignUp(name, email, emailCode, password);
});

export const loginThunk = createAsyncThunk('account/login', async (payload, { dispatch }) => {
  const { email, password } = payload;
  await postSignIn(email, password);
  dispatch(accountSlice.actions.setLoggedIn());
});

export const registerTokenThunk = createAsyncThunk('account/register-token', async (payload) => {
  const { email } = payload;
  await postRegisterToken(email);
});
export const verifyTokenThunk = createAsyncThunk('account/verify-token', async (payload) => {
  const { emailCode, email } = payload;
  await postVerifyToken(emailCode, email);
});

export const changeUserNameThunk = createAsyncThunk('account/user/name', async (payload) => {
  const { name } = payload;
  await putUserName(name);
});

export const changeUserPasswordThunk = createAsyncThunk(
  'account/user/password',
  async (payload) => {
    const { password, newPassword } = payload;
    await putPassword(password, newPassword);
  },
);

export const getUserThunk = createAsyncThunk('account/user', async (_, { dispatch }) => {
  const result = await getUserInfo();
  dispatch(accountSlice.actions.setUser(result));
});
