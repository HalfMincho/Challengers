import axiosInstance from '@utils/axiosConfig';
import { API_URL } from '@constants/API_URL';

export const putPassword = async (password, newPassword) => {
  try {
    const response = await axiosInstance.put(API_URL.USER.PUT_USER_PASSWORD, {
      password: password,
      newPassword: newPassword,
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
