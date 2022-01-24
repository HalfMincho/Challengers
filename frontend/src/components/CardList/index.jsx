import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card';
import './style.scss';

export default function CardList({ type, keyword, category, preview }) {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = '';
        if (type === 'recent' || type === 'popular') {
          if (preview) url = `/challenge/${type}?count=4`;
          else url = `/challenge/${type}`;
        } else if (type === 'category') {
          url = `/challenge/search?category=${category}`;
        } else {
          url = `/challenge/search?keyword=${keyword}`;
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
