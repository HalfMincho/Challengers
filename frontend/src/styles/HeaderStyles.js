import styled from 'styled-components';

export const HeaderBlock = styled.div`
  nav {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 41px 170px 23px;
    border-bottom: 1px solid #ced4da;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  }

  .navbar__left-side {
    display: flex;
    padding: 16px 0 16px 0;
  }
  a {
    padding-right: 50px;
  }
  .navbar__logo_img {
    width: 120px;
    padding-top: 3px;
  }
  .navbar__search {
    display: flex;
    background: #f1f3f5;
    border-radius: 2em;
  }

  input {
    box-sizing: border-box;
    width: 400px;
    height: 45px;
    padding: 12px 0 12px 20px;
    background-color: #f1f3f5;
    outline: none;
    border: none;
    border-radius: 2em;
  }

  .navbar__right-side {
    box-sizing: border-box;
    padding-right: 0;
  }
  .navbar__right-side_make-challenge {
    box-sizing: border-box;
    margin-right: 1em;
    padding: 7px 11px;

    border: none;
    border-radius: 0.3em;
    background-color: #ff3257;
    color: white;
  }
  .navbar__right-side_login {
    box-sizing: border-box;

    padding: 7px 0 7px 11px;
    border: none;
    background-color: white;
    border-radius: 0.3em;
  }
`;

export const HeaderSearchIcon = styled.div`
  box-sizing: border-box;
  padding: 10px 18px 10px;
  font-size: 20px;
  cursor: pointer;
`;
