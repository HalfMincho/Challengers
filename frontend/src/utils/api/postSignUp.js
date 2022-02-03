import axiosInstance from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';

export const postSignUp = async (name, email, emailCode, password) => {
  const response = await axiosInstance.post(API_URL.USER.POST_SIGN_UP, {
    name: name,
    email: email,
    password: password,
    token: emailCode,
  });

  return response.status;
};
