import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ChallengeCard from './ChallengeCard';
import challengeInfo from './temp.json';

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
    flex: none;
  }
`;

const showChallengeCards = () => {
  // TODO: GET API 호출 -> number개의 챌린지 정보 challengeInfo에 저장
  getData();
  const arrayData = challengeInfo.map((item, index) => {
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
};

const ChallengeSection = ({ number, title }) => {
  return (
    <>
      <Section>
        <p className="sectionHeader">
          <span className="sectionTitle">{title}</span>
          <span>더보기</span>
        </p>
        <div className="cardContainer">{showChallengeCards(number)}</div>
      </Section>
    </>
  );
};

export default ChallengeSection;
