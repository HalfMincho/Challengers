import axiosInstance from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';
import { SIGN_IN_NOTIFY_MESSAGE } from '@constants/MESSAGE';

const { PASSWORD_WRONG_ERROR } = SIGN_IN_NOTIFY_MESSAGE;

export const postSignIn = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_URL.USER.POST_SIGN_IN, {
      email: email,
      password: password,
    });
    return response.status;
  } catch (error) {
    if (error.response.status === 403) alert(PASSWORD_WRONG_ERROR);
  }
};
