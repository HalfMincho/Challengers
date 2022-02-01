import './style.scss';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const goResult = () => {
    navigate(`/list/search?keyword=${keyword}`);
    location.reload();
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') goResult();
  };

  return (
    <div className="searchbar__container">
      <input
        type="text"
        value={keyword}
        onChange={handleKeyword}
        onKeyPress={handleKeyPress}
        className="searchbar__input"
        placeholder="검색어를 입력하세요"
      />
      <button onClick={goResult}>
        <FaSearch />
      </button>
    </div>
  );
}
