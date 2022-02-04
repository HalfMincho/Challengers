const validateUserName = (userName) => {
  const userNameRegex = /^[^\s]{1,15}$/;
  return userNameRegex.test(userName);
};

const validateEmail = (email) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
  return passwordRegex.test(password);
};

const validatePasswordCheck = (password, passwordCheck) => {
  return password === passwordCheck;
};

const isSendPossible = (
  userNameResponseText,
  emailResponseText,
  passwordResponseText,
  passwordCheckResponseText,
) => {
  if (
    userNameResponseText === '' &&
    emailResponseText === '' &&
    passwordResponseText === '' &&
    passwordCheckResponseText === ''
  )
    return true;
  else return false;
};

export { validateUserName, validateEmail, validatePassword, validatePasswordCheck, isSendPossible };
