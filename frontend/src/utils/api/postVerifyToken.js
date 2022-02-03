import axios from 'axios';
import { API_URL } from '@constants/API_URL';

export const postVerifyToken = async (email, emailCode) => {
  const response = await axios.post(API_URL.USER.POST_VERIFY_TOKEN, {
    token: emailCode,
    email: email,
  });

  return response.status;
};
