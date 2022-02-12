import { api } from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';
import { SIGN_IN_NOTIFY_MESSAGE } from '@constants/MESSAGE';
import { setAccessToken, setRefreshToken } from '@utils/helpers/tokensHelper';

const { PASSWORD_WRONG_ERROR } = SIGN_IN_NOTIFY_MESSAGE;

export const postSignIn = async (email, password) => {
  try {
    const response = await api.post(API_URL.USER.POST_SIGN_IN, {
      email: email,
      password: password,
    });
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  } catch (error) {
    if (error.response.status === 403) {
      alert(PASSWORD_WRONG_ERROR);
    } else {
      console.log('postSignIn error occur', error);
    }
    return Promise.reject(error);
  }
};
