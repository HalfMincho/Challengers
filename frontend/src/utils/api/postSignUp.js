import axios from 'axios';
import { API_URL } from '@constants/API_URL';

export const postSignUp = async (name, email, emailCode, password) => {
  const response = await axios.post(API_URL.USER.POST_SIGN_UP, {
    name: name,
    email: email,
    password: password,
    token: emailCode,
  });

  return response.status;
};
