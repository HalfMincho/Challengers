import { api } from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';
import { SIGN_UP_ERROR_MESSAGE } from '@constants/MESSAGE';

const { TOKEN_VERIFICATION_IS_NEEDED, PASSWORD_POLICY_MISMATCH, NAME_TOO_LONG } =
  SIGN_UP_ERROR_MESSAGE;

export const postSignUp = async (name, email, emailCode, password) => {
  try {
    await api.post(API_URL.USER.POST_SIGN_UP, {
      name: name,
      email: email,
      password: password,
      token: emailCode,
    });
  } catch (error) {
    const { status, data } = error.response;
    if (status === 404) {
      alert(TOKEN_VERIFICATION_IS_NEEDED);
    } else if (status === 400) {
      if (data.error === 'password_policy_mismatch') {
        alert(PASSWORD_POLICY_MISMATCH);
      } else if (data.error === 'name_too_long') {
        alert(NAME_TOO_LONG);
      }
    }
    return Promise.reject(error);
  }
};
