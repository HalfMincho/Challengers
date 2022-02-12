import {
  getAccessToken,
  getRefreshToken,
  resetAccessToken,
  resetRefreshToken,
  setAccessToken,
} from './tokensHelper';
import { api } from '@utils/axiosConfig';

const refreshToken = () => {
  return api.post(`/account/refresh`, {
    refreshToken: getRefreshToken(),
    accessToken: getAccessToken(),
  });
};

export const responseHandler = (response) => {
  const { data } = response;
  console.log(response);
  const { resultCode, needRedirect, resultData } = data;

  if (resultCode === '0000' && resultData) {
    return resultData;
  }

  if (resultCode === '2004') {
    const originalRequest = response.config;
    return refreshToken().then((res) => {
      setAccessToken(res.accessToken);
      originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
      return api(originalRequest);
    });
  } else {
    if (needRedirect === true) {
      resetAccessToken();
      resetRefreshToken();
      window.location.href = '/login';
    }
    return Promise.reject(data);
  }
};
