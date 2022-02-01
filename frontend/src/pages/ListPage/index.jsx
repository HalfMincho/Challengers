import { useLocation, useParams } from 'react-router-dom';
import CardList from '../../components/CardList';
import AppbarLayout from '../../layouts/AppbarLayout';
import './style.scss';

export default function ListPage() {
  const { type } = useParams();
  const location = useLocation();
  const search = location.search;

  const params = new URLSearchParams(search);
  const keyword = params.get('keyword');
  const category = params.get('category');

  let title = '';
  switch (type) {
    case 'popular':
      title = '인기 챌린지';
      break;
    case 'recent':
      title = '신규 챌린지';
      break;
    case 'search':
      if (keyword) title = `${keyword} 관련 챌린지`;
      else if (category) title = `${category} 챌린지`;
      break;
    default:
      console.log('TypeError');
  }

  return (
    <AppbarLayout>
      <p className="listTitle">{title}</p>
      <CardList type={type} />
    </AppbarLayout>
  );
}
