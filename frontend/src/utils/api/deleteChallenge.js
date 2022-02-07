import axiosInstance from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';

export const postSignUp = async (id) => {
  try {
    const response = await axiosInstance.delete(API_URL.CHALLENGE.CHALLENGE_BY_ID(id));
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
