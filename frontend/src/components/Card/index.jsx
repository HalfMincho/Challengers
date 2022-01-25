import { Link } from 'react-router-dom';
import Tag from '../Tag';
import './style.scss';

export default function Card({ data }) {
  return (
    <Link to={`/detail/${data.id}`}>
      <div className="Card">
        <p className="name">{data.name}</p>
        <div className="startDay">{data.start_at}부터 시작</div>
        <div>
          <Tag>주 O일</Tag>
          <Tag>O주</Tag>
        </div>
      </div>
    </Link>
  );
}
