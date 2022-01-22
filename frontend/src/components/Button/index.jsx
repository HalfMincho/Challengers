import classNames from 'classnames';
import './style.scss';

export default function Button({ children, size, color, outline, fullWidth }) {
  return (
    <button className={classNames('Button', size, color, { outline, fullWidth })}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'small',
  color: 'brand',
};
