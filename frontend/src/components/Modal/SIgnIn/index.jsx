import { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from '..';
import Button from '@components/Button';
import { postSignIn } from '@api/postSignIn';
import { SIGN_IN_NOTIFY_MESSAGE } from '@constants/MESSAGE';
import './style.scss';

const { SIGN_IN_SUCCESS, PASSWORD_WRONG_ERROR } = SIGN_IN_NOTIFY_MESSAGE;

export default function SignInModal({ visible, onClose }) {
  const [inputState, setInputState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputState;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const status = await postSignIn(email, password);
    if (status === 200) {
      alert(SIGN_IN_SUCCESS);
      onClose();
      location.reload();
    } else if (status === 403) {
      alert(PASSWORD_WRONG_ERROR);
    }
  };

  const SignInComponent = (
    <form className="signInWrapper" onSubmit={handleSignIn}>
      <div className="inputs">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={handleInput}
          autoComplete="email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={handleInput}
          autoComplete="new-password"
          required
        />
      </div>
      <Button size="medium" fullWidth>
        로그인
      </Button>
      <p className="links">
        비밀번호 찾기 | <Link to="/signup">회원가입</Link>
      </p>
    </form>
  );

  return (
    <Modal title="로그인" middleContent={SignInComponent} visible={visible} onClose={onClose} />
  );
}
