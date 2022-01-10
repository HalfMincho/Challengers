import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChallengeCard from './ChallengeCard';
import axios from 'axios';

const Section = styled.div`
  margin: 5% 0;

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

    div {
      margin-bottom: 10px;
    }
  }
`;

const showChallengeCards = (data) => {
  if (data) {
    const arrayData = data.map((item, index) => {
      return (
        <ChallengeCard
          auth_count_in_day={item.auth_count_in_day}
          auth_day={item.auth_day}
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
          {preview && <span>더보기</span>}
        </p>
        <div className="cardContainer">{showChallengeCards(data)}</div>
      </Section>
    </>
  );
};

export default ChallengeSection;
