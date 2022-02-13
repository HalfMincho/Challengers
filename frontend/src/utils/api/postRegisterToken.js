import { api } from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';
import { SIGN_UP_NOTIFY_MESSAGE } from '@constants/MESSAGE';

const { EMAIL_REGISTERED_NOTIFY } = SIGN_UP_NOTIFY_MESSAGE;

export const postRegisterToken = async (email) => {
  try {
    return await api.post(API_URL.USER.POST_REGISTER_TOKEN, {
      email: email,
    });
  } catch (error) {
    if (error.response.status === 409) {
      alert(EMAIL_REGISTERED_NOTIFY);
    }
    return Promise.reject(error);
  }
};
