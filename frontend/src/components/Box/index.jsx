import classNames from 'classnames';
import './style.scss';

export default function Box({ children, color, fullWidth, title, content }) {
  return <div className={classNames('Box', color, { fullWidth, title, content })}>{children}</div>;
}
