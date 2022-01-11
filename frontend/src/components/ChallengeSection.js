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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const showChallengeCards = (data) => {
  if (data) {
    const arrayData = data.map((item, index) => {
      return (
        <ChallengeCard
          auth_count_in_day={item.auth_count_in_day}
          auth_day={item.auth_day}
          id={item.id}
          key={index}
          name={item.name}
          start_at={item.start_at}
        />
      );
    });

    return arrayData;
  }
};

const ChallengeSection = ({ number, preview, title, type }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`/challenge/${type}?count=${number}`).then((res) => setData(res.data));
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
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
        <div className="cardContainer">{showChallengeCards(data)}</div>
      </Section>
    </>
  );
};

export default ChallengeSection;
