import { Link } from 'react-router-dom';
import logo_appbar from '../../common/assets/logo.png';

import './style.scss';

const category = ['건강', '역량', '정서', '자산', '생활', '취미'];

function AppbarContainerLink({ category }) {
  return (
    <div className="appbar__container--link">
      <Link className="appbar__link" to={`/category/${category}`}>
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
            <img alt="logo" src={logo_appbar} height={58} width={260} />
          </Link>
        </div>
        {category.map((name, index) => (
          <AppbarContainerLink category={name} key={index} />
        ))}
      </div>
      <div className="layout__content--root">{children}</div>
      <div className="footer__space"></div>
    </div>
  );
}
