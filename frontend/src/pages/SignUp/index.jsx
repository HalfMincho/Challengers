import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import AppbarLayout from '@layouts/AppbarLayout';
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validatePasswordCheck,
  isSendPossible,
} from '@utils/checkResponse';
import { postRegisterToken } from '@api/postRegisterToken';
import { postVerifyToken } from '@api/postVerifyToken';
import { SIGN_UP_ERROR_MESSAGE, SIGN_UP_NOTIFY_MESSAGE } from '@constants/MESSAGE';
import './style.scss';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../features/account/AccountThunks';

const {
  USERNAME_FORM_ERROR,
  EMAIL_FORM_ERROR,
  EMAIL_NULL_ERROR,
  EMAIL_CODE_NULL_ERROR,
  PASSWORD_FORM_ERROR,
  PASSWORD_CHECK_ERROR,
} = SIGN_UP_ERROR_MESSAGE;

const { EMAIL_SEND_NOTIFY, EMAIL_CODE_SUCCESS, SIGN_UP_SUCCESS } = SIGN_UP_NOTIFY_MESSAGE;

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputState, setInputState] = useState({
    userName: '',
    email: '',
    emailCode: '',
    password: '',
    passwordCheck: '',
  });

  const [responseState, setResponseState] = useState({
    userNameResponseText: '',
    emailResponseText: '',
    passwordResponseText: '',
    passwordCheckResponseText: '',
  });

  const [isCodeInput, setIsCodeInput] = useState(false);
  const [isCodeRight, setIsCodeRight] = useState(false);

  const { userName, email, emailCode, password, passwordCheck } = inputState;
  const {
    userNameResponseText,
    emailResponseText,
    passwordResponseText,
    passwordCheckResponseText,
  } = responseState;

  const handleUserName = (e) => {
    const input = e.target.value;
    setInputState({ ...inputState, userName: input });
    setResponseState({
      ...responseState,
      userNameResponseText: validateUserName(input) ? '' : USERNAME_FORM_ERROR,
    });
  };

  const handleEmail = (e) => {
    const input = e.target.value;
    setInputState({ ...inputState, email: input });
    setResponseState({
      ...responseState,
      emailResponseText: validateEmail(input) ? '' : EMAIL_FORM_ERROR,
    });
  };

  const handleEmailCode = (e) => {
    const input = e.target.value;
    setInputState({ ...inputState, emailCode: input });
  };

  const handlePassword = (e) => {
    const input = e.target.value;
    setInputState({ ...inputState, password: input });
    setResponseState({
      ...responseState,
      passwordResponseText: validatePassword(input) ? '' : PASSWORD_FORM_ERROR,
    });
  };

  const handlePasswordCheck = (e) => {
    const input = e.target.value;
    setInputState({ ...inputState, passwordCheck: input });
    setResponseState({
      ...responseState,
      passwordCheckResponseText: validatePasswordCheck(password, input) ? '' : PASSWORD_CHECK_ERROR,
    });
  };

  const handleEmailButton = async () => {
    if (email === '') alert(EMAIL_NULL_ERROR);
    if (emailResponseText === '') {
      const status = await postRegisterToken(email);
      if (status === 200) {
        setIsCodeInput(true);
        alert(EMAIL_SEND_NOTIFY);
      }
    }
  };

  const handleEmailCodeButton = async () => {
    if (emailCode === '') alert(EMAIL_CODE_NULL_ERROR);
    const status = await postVerifyToken(email, emailCode);
    if (status === 200) {
      setIsCodeRight(true);
      alert(EMAIL_CODE_SUCCESS);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      isCodeRight &&
      isSendPossible(
        userNameResponseText,
        emailResponseText,
        passwordResponseText,
        passwordCheckResponseText,
      )
    ) {
      dispatch(
        registerThunk({ name: userName, email: email, emailCode: emailCode, password: password }),
      )
        .unwrap()
        .then(() => {
          alert(SIGN_UP_SUCCESS);
          navigate('/');
        })
        .catch((error) => {
          if (error.resultCode === undefined) {
            alert('Unknown Error');
          } else {
            alert(`${error.resultCode}: ${error.description}`);
          }
        });
    }
  };

  return (
    <AppbarLayout>
      <form id="signUp" onSubmit={handleSignUp} className="signUpWrapper">
        <p className="title">회원가입</p>
        <div className="inputPart">
          <label>이름(닉네임)</label>
          <input
            type="text"
            value={userName}
            placeholder="이름(닉네임) 입력"
            onChange={handleUserName}
            required
          />
          <p className="error">{userNameResponseText}</p>
        </div>
        <div className="inputPart">
          <label>이메일</label>
          <div className="inputButtonWrapper">
            <input
              type="text"
              value={email}
              placeholder="이메일 주소 입력"
              onChange={handleEmail}
              autoComplete="email"
              className="small"
              required
            />
            <Button type="button" size="small" onClick={handleEmailButton}>
              인증 코드 전송
            </Button>
          </div>
          <p className="error">{emailResponseText}</p>
        </div>
        {isCodeInput && (
          <div className="inputPart">
            <label>인증 코드</label>
            <div className="inputButtonWrapper">
              <input
                type="text"
                value={emailCode}
                placeholder="입력하신 이메일로 전송된 인증 코드를 입력하세요"
                onChange={handleEmailCode}
                autoComplete="off"
                className="small"
                required
              />
              <Button type="button" size="small" onClick={handleEmailCodeButton}>
                확인
              </Button>
            </div>
          </div>
        )}
        <div className="inputPart">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호 입력(영문, 숫자 포함 8자리 이상)"
            onChange={handlePassword}
            autoComplete="new-password"
            required
          />
          <p className="error">{passwordResponseText}</p>
        </div>
        <div className="inputPart">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={passwordCheck}
            placeholder="비밀번호 확인"
            onChange={handlePasswordCheck}
            autoComplete="new-password"
            required
          />
          <p className="error">{passwordCheckResponseText}</p>
        </div>
        <Button id="signUp" type="submit" size="medium" fullWidth>
          가입하기
        </Button>
      </form>
    </AppbarLayout>
  );
}
