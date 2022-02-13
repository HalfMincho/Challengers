import { getAccessToken } from './tokensHelper';

export const jwtRequestHandler = (requestConfig) => {
  requestConfig.headers.common.Authorization = `Bearer ${getAccessToken()}`;
  return requestConfig;
};
