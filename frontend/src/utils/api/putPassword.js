import { api } from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';
import { PASSWORD_ERROR_MESSAGE } from '@constants/MESSAGE';

const { PASSWORD_POLICY_MISMATCH } = PASSWORD_ERROR_MESSAGE;

export const putPassword = async (password, newPassword) => {
  try {
    await api.put(API_URL.USER.PUT_USER_PASSWORD, {
      password: password,
      newPassword: newPassword,
    });
  } catch (error) {
    if (error.response.status === 400) {
      alert(PASSWORD_POLICY_MISMATCH);
    }
    console.log('error', error);
    return Promise.reject(error);
  }
};
