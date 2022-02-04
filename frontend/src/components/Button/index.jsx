import classNames from 'classnames';
import './style.scss';

export default function Button({
  children,
  type,
  onClick,
  size = 'small',
  color = 'brand',
  outline,
  fullWidth,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames('Button', size, color, { outline, fullWidth })}
    >
      {children}
    </button>
  );
}
