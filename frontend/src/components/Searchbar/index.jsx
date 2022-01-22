import './style.scss';
import { FaSearch } from 'react-icons/fa';

export default function Searchbar() {
  return (
    <div className="searchbar__container">
      <input type="text" className="searchbar__input" placeholder="검색어를 입력하세요"></input>
      <FaSearch></FaSearch>
    </div>
  );
}
