import classNames from 'classnames';
import './style.scss';

export default function Box({ children, color, fullWidth }) {
  return <div className={classNames('Box', color, { fullWidth })}>{children}</div>;
}
