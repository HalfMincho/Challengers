import classNames from 'classnames';
import './style.scss';

export default function Button({ children, size = 'small', color = 'brand', outline, fullWidth }) {
  return (
    <button className={classNames('Button', size, color, { outline, fullWidth })}>
      {children}
    </button>
  );
}
