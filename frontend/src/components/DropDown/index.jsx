import { FaChevronRight } from 'react-icons/fa';
import './style.scss';

export default function DropDown({ title, content, visible, signOut }) {
  return (
    <div className={`DropDownWrapper ${visible ? 'visible' : 'none'}`}>
      {title && (
        <div className="menuHeader">
          <p className="title">{title}</p>
          <button>
            <FaChevronRight />
          </button>
        </div>
      )}
      <div className="menuContent">{content}</div>
      {signOut && <div className="signOut">로그아웃</div>}
    </div>
  );
}
