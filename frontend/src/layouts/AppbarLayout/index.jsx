import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Searchbar from '@components/Searchbar';
import SignInModal from '@components/Modal/SIgnIn';

import './style.scss';

function AppbarContainerLink({ category, onClick }) {
  return (
    <div className="appbar__container--link" onClick={onClick}>
      <span className="appbar__link">{category}</span>
    </div>
  );
}

export default function AppbarLayout({ children }) {
  const navigate = useNavigate();
  const category = ['건강', '역량', '정서', '자산', '생활', '취미'];
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  const openModal = () => {
    setSignInModalVisible(true);
  };

  const closeModal = () => {
    setSignInModalVisible(false);
  };

  const goResult = (name) => {
    navigate(`/list/search?category=${name}`);
    location.reload();
  };

  return (
    <div className="layout__root">
      <div className="appbar__container">
        <div className="appbar__container--logo">
          <Link className="appbar__link" to="/">
            <img alt="logo" src="/assets/logo_appbar.png" height={58} width={260} />
          </Link>
        </div>
        {category.map((name, index) => (
          <AppbarContainerLink category={name} key={index} onClick={() => goResult(name)} />
        ))}
        <Searchbar />
        <div className="appbar__container--buttons">
          <Link to="/signup">
            <Button color="gray" outline>
              회원가입
            </Button>
          </Link>
          <Button onClick={openModal}>로그인</Button>
        </div>
      </div>
      {signInModalVisible && <SignInModal visible={signInModalVisible} onClose={closeModal} />}
      <div className="layout__content--root">{children}</div>
      <div className="footer__space"></div>
    </div>
  );
}
