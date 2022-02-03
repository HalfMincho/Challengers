import axios from 'axios';
import { API_URL } from '@constants/API_URL';

export const postRegisterToken = async (email) => {
  const response = await axios.post(API_URL.USER.POST_REGISTER_TOKEN, {
    email: email,
  });

  return response.status;
};
