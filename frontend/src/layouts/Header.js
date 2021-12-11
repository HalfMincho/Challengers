import React from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { HeaderBlock, HeaderSearchIcon } from '../styles/HeaderStyles';

function Header() {
  return (
    <>
      <HeaderBlock>
        <nav>
          <div className="navbar__left-side">
            <div className="navbar__logo">
              <a href="">
                <img className="navbar__logo_img" src="/mainLogo.png"/>
              </a>
            </div>
            <div className="navbar__search">
              <input type="search" placeholder="어떤 습관을 가지고 싶으신가요?" />
              <HeaderSearchIcon><HiOutlineSearch /></HeaderSearchIcon>
            </div>
          </div>
          <div className="navbar__right-side">
            <button className="navbar__right-side_make-challenge">
              <span>챌린지 개설하기</span>
            </button>
            <button className="navbar__right-side_login">
              <span>로그인</span>
            </button>
          </div>
        </nav>
      </HeaderBlock>
    </>
  )
}

export default Header;