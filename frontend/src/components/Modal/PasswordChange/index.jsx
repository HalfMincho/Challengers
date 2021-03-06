import { useState } from 'react';
import Modal from '..';
import Button from '@components/Button';
import { validatePassword, validatePasswordCheck } from '@utils/checkResponse';
import { SIGN_UP_ERROR_MESSAGE } from '@utils/constants/MESSAGE';
import './style.scss';
import { useDispatch } from 'react-redux';
import { changeUserPasswordThunk } from '../../../features/account/AccountThunks';

const { PASSWORD_FORM_ERROR, PASSWORD_CHECK_ERROR } = SIGN_UP_ERROR_MESSAGE;

export default function PasswordChangeModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });

  const [responseState, setResponseState] = useState({
    passwordResponseText: '',
    newPasswordResponseText: '',
    newPasswordCheckResponseText: '',
  });

  const { password, newPassword, newPasswordCheck } = inputState;
  const { passwordResponseText, newPasswordResponseText, newPasswordCheckResponseText } =
    responseState;

  const handlePassword = (e) => {
    setInputState({ ...inputState, password: e.target.value });
  };

  const handleNewPassword = (e) => {
    const input = e.target.value;
    setInputState({ ...inputState, newPassword: input });
    setResponseState({
      ...responseState,
      newPasswordResponseText: validatePassword(input) ? '' : PASSWORD_FORM_ERROR,
    });
  };

  const handleNewPasswordCheck = (e) => {
    const input = e.target.value;
    setInputState({ ...inputState, newPasswordCheck: input });
    setResponseState({
      ...responseState,
      newPasswordCheckResponseText: validatePasswordCheck(newPassword, input)
        ? ''
        : PASSWORD_CHECK_ERROR,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (
      passwordResponseText === '' &&
      newPasswordResponseText === '' &&
      newPasswordCheckResponseText === ''
    ) {
      dispatch(changeUserPasswordThunk({ password: password, newPassword: newPassword }))
        .unwrap()
        .then(() => {
          onClose();
          location.reload();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  const PasswordChangeComponent = (
    <form className="PasswordChangeModalWrapper" onSubmit={changePassword}>
      <div className="inputPart">
        <input
          type="password"
          value={password}
          placeholder="?????? ????????????"
          onChange={handlePassword}
          autoComplete="new-password"
          required
        />
        <p className="error">{passwordResponseText}</p>
      </div>
      <div className="inputPart">
        <input
          type="password"
          value={newPassword}
          placeholder="??? ????????????"
          onChange={handleNewPassword}
          autoComplete="new-password"
          required
        />
        <p className="error">{newPasswordResponseText}</p>
      </div>
      <div className="inputPart">
        <input
          type="password"
          value={newPasswordCheck}
          placeholder="??? ???????????? ??????"
          onChange={handleNewPasswordCheck}
          autoComplete="new-password"
          required
        />
        <p className="error">{newPasswordCheckResponseText}</p>
      </div>
      <Button type="submit" size="medium" fullWidth>
        ??????
      </Button>
    </form>
  );

  return (
    <Modal
      title="???????????? ??????"
      middleContent={PasswordChangeComponent}
      visible={visible}
      onClose={onClose}
      size="small"
    />
  );
}
