import { api } from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';

export const getUser = async () => {
  try {
    const response = await api.get(API_URL.USER.GET_USER);
    return response;
  } catch (error) {
    console.log('error', error);
  }
};
