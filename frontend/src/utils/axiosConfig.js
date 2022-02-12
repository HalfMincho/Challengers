import axios from 'axios';
import { jwtRequestHandler } from './helpers/jwtRequestHandler';
import { responseHandler } from './helpers/responseHandler';

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    return jwtRequestHandler(config);
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return responseHandler(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api };
