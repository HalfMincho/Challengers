import { FaChevronRight } from 'react-icons/fa';
import './style.scss';

export default function DropDown({ title, content, signOut }) {
  return (
    <div className="DropDownWrapper">
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
