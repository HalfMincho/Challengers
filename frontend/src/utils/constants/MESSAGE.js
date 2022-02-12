const SIGN_UP_ERROR_MESSAGE = {
  USERNAME_FORM_ERROR: '이름(닉네임)은 공백 없이 1~15자여야 합니다.',
  EMAIL_FORM_ERROR: '이메일 형식이 올바르지 않습니다.',
  EMAIL_NULL_ERROR: '이메일 주소를 입력해 주세요.',
  EMAIL_CODE_ERROR: '인증 코드가 일치하지 않습니다.',
  EMAIL_CODE_NULL_ERROR: '인증 코드를 입력해 주세요.',
  PASSWORD_FORM_ERROR: '비밀번호는 6자 이상 20자 이하 영문과 숫자를 최소 1개씩 포함해야 합니다.',
  PASSWORD_CHECK_ERROR: '비밀번호가 일치하지 않습니다.',

  // '/account/register' 관련
  TOKEN_VERIFICATION_IS_NEEDED: '인증 코드가 검증되지 않았습니다. 검증 후 다시 시도해주세요.',
  NAME_TOO_LONG: '이름이 255자 이상입니다.',
};

const PASSWORD_ERROR_MESSAGE = {
  PASSWORD_POLICY_MISMATCH: '해당 비밀번호가 비밀번호 정책에 부합하지 않습니다.',
};

const SIGN_UP_NOTIFY_MESSAGE = {
  EMAIL_SEND_NOTIFY: '입력하신 이메일로 인증 메일이 전송되었습니다. 메일을 확인해 주세요.',
  EMAIL_REGISTERED_NOTIFY: '이미 가입된 이메일입니다.',
  EMAIL_CODE_SUCCESS: '인증 코드가 확인되었습니다.',
  SIGN_UP_SUCCESS: '회원가입이 완료되었습니다. 로그인 후 이용해 주세요.',
};

const SIGN_IN_NOTIFY_MESSAGE = {
  SIGN_IN_SUCCESS: '로그인되었습니다.',
  PASSWORD_WRONG_ERROR: '아이디 또는 비밀번호를 확인해 주세요.',
};

const CHALLENGE_MANAGE_MESSAGE = {
  CHALLENGE_DELETE_MESSAGE: '챌린지가 삭제되었습니다.',
};

export {
  SIGN_UP_ERROR_MESSAGE,
  SIGN_UP_NOTIFY_MESSAGE,
  SIGN_IN_NOTIFY_MESSAGE,
  CHALLENGE_MANAGE_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
};
