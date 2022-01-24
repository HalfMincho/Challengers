import CardList from '../../components/CardList';
import AppbarLayout from '../../layout/AppbarLayout';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './style.scss';

export default function MainPage() {
  return (
    <AppbarLayout>
      <div>
        <div className="listTitle">
          <p>인기 챌린지</p>
          <Link to="/list/popular">
            <button>
              <FaChevronRight />
            </button>
          </Link>
        </div>
        <CardList type="popular" preview />
      </div>
      <div>
        <div className="listTitle">
          <p>신규 챌린지</p>
          <Link to="/list/recent">
            <button>
              <FaChevronRight />
            </button>
          </Link>
        </div>
        <CardList type="recent" preview />
      </div>
    </AppbarLayout>
  );
}
