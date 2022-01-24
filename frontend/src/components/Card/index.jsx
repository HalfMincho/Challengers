import Tag from '../Tag';
import './style.scss';

export default function Card({ data }) {
  return (
    <div className="Card">
      <p className="name">{data.name}</p>
      <div className="startDay">{data.start_at}부터 시작</div>
      <div>
        <Tag>{data.auth_day}</Tag>
        <Tag>
          {data.end_at} - {data.start_at}
        </Tag>
      </div>
    </div>
  );
}
