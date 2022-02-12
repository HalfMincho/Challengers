import { api } from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';
import { setAccessToken, setRefreshToken } from '@utils/helpers/tokensHelper';
import { SIGN_UP_ERROR_MESSAGE } from '@constants/MESSAGE';

const { TOKEN_VERIFICATION_IS_NEEDED, PASSWORD_POLICY_MISMATCH, NAME_TOO_LONG } =
  SIGN_UP_ERROR_MESSAGE;

export const postSignUp = async (name, email, emailCode, password) => {
  try {
    const response = await api.post(API_URL.USER.POST_SIGN_UP, {
      name: name,
      email: email,
      password: password,
      token: emailCode,
    });
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  } catch (error) {
    const { status, result } = error.response;
    if (status === 404) {
      alert(TOKEN_VERIFICATION_IS_NEEDED);
    } else if (status === 400) {
      if (result.error === 'password_policy_mismatch') {
        alert(PASSWORD_POLICY_MISMATCH);
      } else if (result.error === 'name_too_long') {
        alert(NAME_TOO_LONG);
      }
    } else {
      console.log('postSignUp error occur', error);
    }
    // let message = '';
    // if (error.resultCode === '2008' || error.resultCode === '2009') {
    //   message = '아이디 또는 비밀번호를 확인해 주세요';
    // } else {
    //   message = `${error.resultCode}: ${error.description}`;
    // }
    return Promise.reject(error);
  }
};
