const SIGN_UP_ERROR_MESSAGE = {
  USERNAME_FORM_ERROR: '이름(닉네임)은 공백 없이 1~15자여야 합니다.',
  EMAIL_FORM_ERROR: '이메일 형식이 올바르지 않습니다.',
  EMAIL_NULL_ERROR: '이메일 주소를 입력해 주세요.',
  EMAIL_CODE_ERROR: '인증 코드가 일치하지 않습니다.',
  PASSWORD_FORM_ERROR: '비밀번호는 6자 이상 20자 이하 영문과 숫자를 최소 1개씩 포함해야 합니다.',
  PASSWORD_CHECK_ERROR: '비밀번호가 일치하지 않습니다.',
};

const SIGN_UP_NOTIFY_MESSAGE = {
  EMAIL_SEND_NOTIFY: '입력하신 이메일로 인증 메일이 전송되었습니다. 메일을 확인해 주세요.',
  EMAIL_REGISTERED_NOTIFY: '이미 가입된 이메일입니다.',
  EMAIL_CODE_SUCCESS: '인증 코드가 확인되었습니다.',
  SIGN_UP_SUCCESS: '회원가입이 완료되었습니다. 로그인 후 이용해 주세요.',
};

export { SIGN_UP_ERROR_MESSAGE, SIGN_UP_NOTIFY_MESSAGE };
