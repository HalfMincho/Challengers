import classNames from 'classnames';
import './style.scss';

export default function Box({ children, color }) {
  return <div className={classNames('Box', color)}>{children}</div>;
}
