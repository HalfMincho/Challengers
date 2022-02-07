export const API_URL = {
  USER: {
    POST_REGISTER_TOKEN: '/account/register-token',
    POST_VERIFY_TOKEN: '/account/verify-token',
    POST_SIGN_UP: '/account/register',
    POST_SIGN_IN: '/account/login',
  },
  CHALLENGE: {
    CHALLENGE_BY_ID: (id) => `/challenge/${id}`,
  },
};
