import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Card';
import './style.scss';

export default function CardList({ type, preview }) {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const search = location.search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = '';
        if (type === 'recent' || type === 'popular') {
          url = `/challenge/${type}`;
          if (preview) url += '?count=4';
        } else {
          url = `/challenge/search${search}`;
        }

        const response = await axios.get(url);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="CardList">
      {data && data.map((item, index) => <Card key={index} data={item} preview />)}
    </div>
  );
}
