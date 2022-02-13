import {
  getAccessToken,
  getRefreshToken,
  resetAccessToken,
  resetRefreshToken,
  setAccessToken,
} from './tokensHelper';
import { api } from '@utils/axiosConfig';

const refreshToken = () => {
  return api.get(`/account/refresh`, {
    headers: { Authorization: `Challengers ${getAccessToken()}`, Refresh: `${getRefreshToken()}` },
  });
};

export const responseHandler = (response) => {
  const { status, data } = response;

  if (status === 200) {
    return data;
  }

  if (data.message === 'jwt expired') {
    const originalRequest = response.config;
    return refreshToken().then((axiosRes) => {
      setAccessToken(axiosRes.accessToken.newAccessToken);
      originalRequest.headers['Authorization'] = `Bearer ${axiosRes.accessToken.newAccessToken}`;
      return api(originalRequest);
    });
  } else {
    if (status === 401) {
      resetAccessToken();
      resetRefreshToken();
      window.location.href = '/login';

      if (data.error === 'new_login_is_required') {
        alert('인증이 만료되었습니다. 다시 로그인 해주세요.');
      } else {
        alert('유효하지 않은 계정입니다. 다시 로그인 해주세요.');
      }
    } else {
      alert('인증에 실패하였습니다. 로그인 해주세요.');
      return Promise.reject(data);
    }
  }
};
