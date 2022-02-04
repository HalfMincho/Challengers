import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
export default axiosInstance;
