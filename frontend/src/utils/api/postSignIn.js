import axiosInstance from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';

export const postSignIn = async (email, password) => {
  const response = await axiosInstance.post(API_URL.USER.POST_SIGN_IN, {
    email: email,
    password: password,
  });

  return response.status;
};
