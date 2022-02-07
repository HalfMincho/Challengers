import { useState } from 'react';
import Modal from '..';
import Button from '@components/Button';
import { validatePassword, validatePasswordCheck } from '@utils/checkResponse';
import { putPassword } from '@utils/api/putPassword';
import { SIGN_UP_ERROR_MESSAGE } from '@utils/constants/MESSAGE';
import './style.scss';

const { PASSWORD_FORM_ERROR, PASSWORD_CHECK_ERROR } = SIGN_UP_ERROR_MESSAGE;

export default function PasswordChangeModal({ visible, onClose }) {
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
      const status = await putPassword(password, newPassword);
      if (status === 200) {
        onClose();
        location.reload();
      }
    }
  };

  const PasswordChangeComponent = (
    <form className="PasswordChangeModalWrapper" onSubmit={changePassword}>
      <div className="inputPart">
        <input
          type="password"
          value={password}
          placeholder="현재 비밀번호"
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
          placeholder="새 비밀번호"
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
          placeholder="새 비밀번호 확인"
          onChange={handleNewPasswordCheck}
          autoComplete="new-password"
          required
        />
        <p className="error">{newPasswordCheckResponseText}</p>
      </div>
      <Button type="submit" size="medium" fullWidth>
        확인
      </Button>
    </form>
  );

  return (
    <Modal
      title="비밀번호 변경"
      middleContent={PasswordChangeComponent}
      visible={visible}
      onClose={onClose}
      size="small"
    />
  );
}
