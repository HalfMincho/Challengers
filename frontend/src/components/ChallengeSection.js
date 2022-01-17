import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChallengeCard from './ChallengeCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Section = styled.div`
  margin: 5% 0;

  a {
    text-decoration: none;
  }
  a:link,
  a:visited {
    color: black;
  }

  .sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 15px;

    .sectionTitle {
      font-size: 1.5em;
      font-weight: 600;
    }
  }

  .cardContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-items: center;
    row-gap: 50px;
    column-gap: 10px;
  }
`;

const ChallengeSection = ({ number, preview, title, type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/challenge/${type}?count=${number}`);
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
    <>
      <Section>
        <p className="sectionHeader">
          <span className="sectionTitle">{title}</span>
          {preview && (
            <span>
              <Link to={type}>더보기</Link>
            </span>
          )}
        </p>
        <div className="cardContainer">
          {data &&
            data.map((item, index) => (
              <ChallengeCard
                auth_count_in_day={item.auth_count_in_day}
                auth_day={item.auth_day}
                id={item.id}
                key={index}
                name={item.name}
                start_at={item.start_at}
              />
            ))}
        </div>
      </Section>
    </>
  );
};

export default ChallengeSection;
