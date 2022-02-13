import { api } from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';

export const putUserName = async (name) => {
  try {
    await api.put(API_URL.USER.PUT_USER_NAME, { name: name });
  } catch (error) {
    console.log('error', error);
    return Promise.reject(error);
  }
};
