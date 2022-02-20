export const API_URL = {
  USER: {
    POST_REGISTER_TOKEN: '/account/register-token',
    POST_VERIFY_TOKEN: '/account/verify-token',
    POST_SIGN_UP: '/account/register',
    POST_SIGN_IN: '/account/login',
    PUT_USER_NAME: '/account/user/name',
    PUT_USER_PASSWORD: '/account/user/password',
    // TODO: 백엔드에 따라 url 변경 필요
    GET_USER: '/account/user',
  },
  CHALLENGE: {
    CHALLENGE_BY_ID: (id) => `/challenge/${id}`,
  },
};
