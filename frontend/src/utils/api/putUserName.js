import axiosInstance from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';

export const putUserName = async (name) => {
  try {
    const response = await axiosInstance.put(API_URL.USER.PUT_USER_NAME, { name: name });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
