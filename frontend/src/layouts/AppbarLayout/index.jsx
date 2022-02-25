import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsBookmark,
  BsBookmarkFill,
  BsCart,
  BsCartFill,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs';

import Button from '@components/Button';
import Searchbar from '@components/Searchbar';
import SignInModal from '@components/Modal/SignIn';
import Bookmark from '@components/DropDown/Bookmark';
import Cart from '@components/DropDown/Cart';
import Profile from '@components/DropDown/Profile';
import { resetAccessToken, resetRefreshToken } from '@utils/helpers/tokensHelper';
import accountSlice from '@features/account/AccountSlice';
import './style.scss';

function AppbarContainerLink({ category, onClick }) {
  return (
    <ul className="appbar__container--link" onClick={onClick}>
      <li className="appbar__link">{category}</li>
    </ul>
  );
}

export default function AppbarLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const category = ['건강', '역량', '정서', '자산', '생활', '취미'];

  const goResult = (name) => {
    navigate(`/list/search?category=${name}`);
    location.reload();
  };

  const handleLogout = () => {
    resetAccessToken();
    resetRefreshToken();
    dispatch(accountSlice.actions.setLoggedOut());
    navigate('/');
  };

  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const openModal = () => {
    setSignInModalVisible(true);
  };
  const closeModal = () => {
    setSignInModalVisible(false);
  };

  const [icons, setIcons] = useState({
    bookmark: false,
    cart: false,
    profile: false,
  });
  const { bookmark, cart, profile } = icons;
  const openDropDown = (e) => {
    setIcons({ ...icons, [e.target.name]: true });
  };
  const closeDropDown = (e) => {
    setTimeout(() => {
      setIcons({ ...icons, [e.target.name]: false });
    }, 2000);
  };

  // eslint-disable-next-line no-unused-vars
  const SignOutStatusButtons = (
    <>
      <div className="appbar__container--buttons">
        <Link to="/signup">
          <Button color="gray" outline>
            회원가입
          </Button>
        </Link>
        <Button onClick={openModal}>로그인</Button>
        {signInModalVisible && <SignInModal visible={signInModalVisible} onClose={closeModal} />}
      </div>
    </>
  );

  const SignInStatusButtons = (
    <>
      <ul className="appbar__container--buttons signIn">
        <li>
          <button name="bookmark" onMouseEnter={openDropDown} onMouseLeave={closeDropDown}>
            {bookmark ? <BsBookmarkFill /> : <BsBookmark />}
          </button>
          <Bookmark visible={bookmark} />
        </li>
        <li>
          <button name="cart" onMouseEnter={openDropDown} onMouseLeave={closeDropDown}>
            {cart ? <BsCartFill /> : <BsCart />}
          </button>
          <Cart visible={cart} />
        </li>
        <li>
          <button name="profile" onMouseEnter={openDropDown} onMouseLeave={closeDropDown}>
            {profile ? <BsPersonFill /> : <BsPerson />}
          </button>
          <Profile visible={profile} handleLogout={handleLogout} />
        </li>
      </ul>
    </>
  );

  return (
    <div className="layout__root">
      <div className="appbar__container">
        <Link to="/">
          <img alt="logo" src="/assets/logo_appbar.png" height={58} width={260} />
        </Link>
        <nav className="appbar__container--category">
          {category.map((name, index) => (
            <AppbarContainerLink category={name} key={index} onClick={() => goResult(name)} />
          ))}
        </nav>
        <Searchbar />
        {account.isLoggedIn ? SignInStatusButtons : SignOutStatusButtons}
      </div>
      <div className="layout__content--root">{children}</div>
      <div className="footer__space"></div>
    </div>
  );
}
