import { useParams } from 'react-router-dom';
import CardList from '../../components/CardList';
import AppbarLayout from '../../layout/AppbarLayout';
import './style.scss';

export default function ListPage() {
  const { type, subcategory } = useParams();

  let title = '',
    keyword = '';
  switch (type) {
    case 'recent':
      title = '신규 챌린지';
      break;
    case 'popular':
      title = '인기 챌린지';
      break;
    case 'category':
      title = `${subcategory} 챌린지`;
      break;
    default:
      keyword = type;
      title = `${keyword} 관련 챌린지`;
  }

  return (
    <AppbarLayout>
      <p className="listTitle">{title}</p>
      <CardList type={type} keyword={keyword} category={subcategory} />
    </AppbarLayout>
  );
}
