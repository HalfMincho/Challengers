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
import { SIGN_UP_ERROR_MESSAGE, SIGN_UP_NOTIFY_MESSAGE } from '@constants/MESSAGE';
import './style.scss';
import { useDispatch } from 'react-redux';
import {
  registerThunk,
  registerTokenThunk,
  verifyTokenThunk,
} from '../../features/account/AccountThunks';

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
    if (email === '') {
      alert(EMAIL_NULL_ERROR);
    } else if (emailResponseText === '') {
      dispatch(registerTokenThunk({ email: email }))
        .unwrap()
        .then((payload) => {
          console.log('fulfilled', payload);
          setIsCodeInput(true);
          alert(EMAIL_SEND_NOTIFY);
        })
        .catch((error) => {
          console.log('rejected', error);
        });
    }
  };

  const handleEmailCodeButton = async () => {
    if (emailCode === '') {
      alert(EMAIL_CODE_NULL_ERROR);
    } else {
      dispatch(verifyTokenThunk({ emailCode: emailCode, email: email }))
        .unwrap()
        .then((payload) => {
          console.log('fulfilled', payload);
          setIsCodeRight(true);
          alert(EMAIL_CODE_SUCCESS);
        })
        .catch((error) => {
          console.log('rejected', error);
        });
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
          if (error.status === undefined) {
            alert('Unknown Error');
          } else {
            alert(`${error.status}: ${error.result}`);
          }
        });
    }
  };

  return (
    <AppbarLayout>
      <form id="signUp" onSubmit={handleSignUp} className="signUpWrapper">
        <p className="title">????????????</p>
        <div className="inputPart">
          <label>??????(?????????)</label>
          <input
            type="text"
            value={userName}
            placeholder="??????(?????????) ??????"
            onChange={handleUserName}
            required
          />
          <p className="error">{userNameResponseText}</p>
        </div>
        <div className="inputPart">
          <label>?????????</label>
          <div className="inputButtonWrapper">
            <input
              type="text"
              value={email}
              placeholder="????????? ?????? ??????"
              onChange={handleEmail}
              autoComplete="email"
              className="small"
              required
            />
            <Button type="button" size="small" onClick={handleEmailButton}>
              ?????? ?????? ??????
            </Button>
          </div>
          <p className="error">{emailResponseText}</p>
        </div>
        {isCodeInput && (
          <div className="inputPart">
            <label>?????? ??????</label>
            <div className="inputButtonWrapper">
              <input
                type="text"
                value={emailCode}
                placeholder="???????????? ???????????? ????????? ?????? ????????? ???????????????"
                onChange={handleEmailCode}
                autoComplete="off"
                className="small"
                required
              />
              <Button type="button" size="small" onClick={handleEmailCodeButton}>
                ??????
              </Button>
            </div>
          </div>
        )}
        <div className="inputPart">
          <label>????????????</label>
          <input
            type="password"
            value={password}
            placeholder="???????????? ??????(??????, ?????? ?????? 8?????? ??????)"
            onChange={handlePassword}
            autoComplete="new-password"
            required
          />
          <p className="error">{passwordResponseText}</p>
        </div>
        <div className="inputPart">
          <label>???????????? ??????</label>
          <input
            type="password"
            value={passwordCheck}
            placeholder="???????????? ??????"
            onChange={handlePasswordCheck}
            autoComplete="new-password"
            required
          />
          <p className="error">{passwordCheckResponseText}</p>
        </div>
        <Button id="signUp" type="submit" size="medium" fullWidth>
          ????????????
        </Button>
      </form>
    </AppbarLayout>
  );
}
