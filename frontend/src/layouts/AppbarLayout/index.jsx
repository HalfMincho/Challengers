import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsBookmark, BsCart3, BsPerson } from 'react-icons/bs';

import Button from '@components/Button';
import Searchbar from '@components/Searchbar';
import SignInModal from '@components/Modal/SignIn';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetAccessToken, resetRefreshToken } from '@utils/helpers/tokensHelper';
import accountSlice from '../../features/account/AccountSlice';

function AppbarContainerLink({ category, onClick }) {
  return (
    <div className="appbar__container--link" onClick={onClick}>
      <span className="appbar__link">{category}</span>
    </div>
  );
}

export default function AppbarLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = ['건강', '역량', '정서', '자산', '생활', '취미'];
  const goResult = (name) => {
    navigate(`/list/search?category=${name}`);
    location.reload();
  };

  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const account = useSelector((state) => state.account);

  const openModal = () => {
    setSignInModalVisible(true);
  };
  const closeModal = () => {
    setSignInModalVisible(false);
  };

  // eslint-disable-next-line no-unused-vars
  const LogoutStatusButtons = (
    <>
      <div className="appbar__container--buttons">
        <Link to="/signup">
          <Button color="gray" outline>
            회원가입
          </Button>
        </Link>
        <Button onClick={openModal}>로그인</Button>
      </div>
      {signInModalVisible && <SignInModal visible={signInModalVisible} onClose={closeModal} />}
    </>
  );

  const handleLogout = () => {
    resetAccessToken();
    resetRefreshToken();
    dispatch(accountSlice.actions.setLoggedOut());
    navigate('/');
  };

  const LoginStatusButtons = (
    <>
      <div className="appbar__container--buttons">
        <div className="button">
          <button name="bookmark">
            <BsBookmark />
          </button>
        </div>
        <div className="button">
          <button name="cart">
            <BsCart3 />
          </button>
        </div>
        <div className="button">
          <button name="profile">
            <BsPerson />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="layout__root">
      <div className="appbar__container">
        <div className="appbar__container--logo">
          <Link className="appbar__link" to="/">
            <img alt="logo" src="/assets/logo_appbar.png" height={58} width={260} />
          </Link>
        </div>
        <div className="appbar__container--category">
          {category.map((name, index) => (
            <AppbarContainerLink category={name} key={index} onClick={() => goResult(name)} />
          ))}
        </div>
        <Searchbar />
        <div className="appbar__container--buttons">
          <Link to="/signup">
            <Button color="gray" outline>
              회원가입
            </Button>
          </Link>
          {account.isLoggedIn ? (
            <Button onClick={handleLogout}>로그아웃</Button>
          ) : (
            <Button onClick={openModal}>로그인</Button>
          )}
        </div>
        {/* {LogoutStatusButtons} */}
        {LoginStatusButtons}
      </div>
      <div className="layout__content--root">{children}</div>
      <div className="footer__space"></div>
    </div>
  );
}
