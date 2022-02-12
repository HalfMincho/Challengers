import { API_URL } from '@constants/API_URL';
import { SIGN_UP_ERROR_MESSAGE } from '@constants/MESSAGE';
import { api } from '@utils/axiosConfig';

const { EMAIL_CODE_ERROR } = SIGN_UP_ERROR_MESSAGE;

export const postVerifyToken = async (email, emailCode) => {
  try {
    const response = await api.post(API_URL.USER.POST_VERIFY_TOKEN, {
      token: emailCode,
      email: email,
    });
    return response.status;
  } catch (error) {
    if (error.response.status === 404) alert(EMAIL_CODE_ERROR);
  }
};
