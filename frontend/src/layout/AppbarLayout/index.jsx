import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Searchbar from '../../components/Searchbar';

import './style.scss';

const category = ['건강', '역량', '정서', '자산', '생활', '취미'];

function AppbarContainerLink({ category }) {
  return (
    <div className="appbar__container--link">
      <Link className="appbar__link" to={`/list/category/${category}`}>
        {category}
      </Link>
    </div>
  );
}

export default function AppbarLayout({ children }) {
  return (
    <div className="layout__root">
      <div className="appbar__container">
        <div className="appbar__container--logo">
          <Link className="appbar__link" to="/">
            <img alt="logo" src="/assets/logo_appbar.png" height={58} width={260} />
          </Link>
        </div>
        {category.map((name, index) => (
          <AppbarContainerLink category={name} key={index} />
        ))}
        <Searchbar />
        <div className="appbar__container--buttons">
          <Button color="gray" outline>
            회원가입
          </Button>
          <Button>로그인</Button>
        </div>
      </div>
      <div className="layout__content--root">{children}</div>
      <div className="footer__space"></div>
    </div>
  );
}
