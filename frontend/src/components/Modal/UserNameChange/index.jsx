import { useState } from 'react';
import Modal from '..';
import Button from '@components/Button';
import { putUserName } from '@utils/api/putUserName';
import { validateUserName } from '@utils/checkResponse';
import { SIGN_UP_ERROR_MESSAGE } from '@utils/constants/MESSAGE';
import './style.scss';

const { USERNAME_FORM_ERROR } = SIGN_UP_ERROR_MESSAGE;

export default function UserNameChangeModal({ visible, onClose }) {
  const [userName, setUserName] = useState('');
  const [userNameResponseText, setUserNameResponseText] = useState('');

  const handleUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
    setUserNameResponseText(validateUserName(value) ? '' : USERNAME_FORM_ERROR);
  };

  const changeUserName = async () => {
    if (userNameResponseText === '') {
      const status = await putUserName(userName);
      if (status === 200) {
        onClose();
        location.reload();
      }
    }
  };

  const UserNameChangeComponent = (
    <form className="UserNameChangeModalWrapper" onSubmit={changeUserName}>
      <input
        value={userName}
        placeholder="변경할 이름(닉네임)을 입력해 주세요."
        onChange={handleUserName}
        required
      />
      <p className="error">{userNameResponseText}</p>
      <Button type="submit" size="medium" fullWidth>
        확인
      </Button>
    </form>
  );

  return (
    <Modal
      title="이름(닉네임) 변경"
      middleContent={UserNameChangeComponent}
      visible={visible}
      onClose={onClose}
      size="small"
    />
  );
}
