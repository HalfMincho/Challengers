import { useState } from 'react';
import Modal from '..';
import Button from '@components/Button';
import { validateUserName } from '@utils/checkResponse';
import { SIGN_UP_ERROR_MESSAGE } from '@utils/constants/MESSAGE';
import './style.scss';
import { useDispatch } from 'react-redux';
import { changeUserNameThunk } from '../../../features/account/AccountThunks';

const { USERNAME_FORM_ERROR } = SIGN_UP_ERROR_MESSAGE;

export default function UserNameChangeModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userNameResponseText, setUserNameResponseText] = useState('');

  const handleUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
    setUserNameResponseText(validateUserName(value) ? '' : USERNAME_FORM_ERROR);
  };

  const changeUserName = async () => {
    if (userNameResponseText === '') {
      dispatch(changeUserNameThunk({ name: userName }))
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
