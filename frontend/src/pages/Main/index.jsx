import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AppbarLayout from '@layouts/AppbarLayout';
import CardList from '@components/CardList';
import './style.scss';

export default function MainPage() {
  return (
    <AppbarLayout>
      <div>
        <div className="listTitle">
          <p>인기 챌린지</p>
          <Link to="/list/popular">
            <FaChevronRight />
          </Link>
        </div>
        <CardList type="popular" preview />
      </div>
      <div>
        <div className="listTitle">
          <p>신규 챌린지</p>
          <Link to="/list/recent">
            <FaChevronRight />
          </Link>
        </div>
        <CardList type="recent" preview />
      </div>
    </AppbarLayout>
  );
}
