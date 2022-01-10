import React from 'react';
import styled from 'styled-components';

const ChallengeCardBlock = styled.div`
  margin-bottom: 30px;

  * {
    margin-bottom: 5px;
  }

  .cardImage {
    height: 200px;
    width: 250px;
    border: 1px solid grey;
    margin-bottom: 10px;
  }

  .cardTitle {
    font-size: 1.2em;
    font-weight: 500;
  }

  .cardStartDay {
    color: grey;
    font-size: 0.9em;
  }

  .cardTag {
    span {
      background: #f1f3f5;
      margin-right: 10px;
      padding: 3px 5px;
      font-size: 0.9em;
    }
  }
`;

const ChallengeCard = ({ name, start_at, auth_count_in_day, auth_day }) => {
  return (
    <ChallengeCardBlock>
      <div className="cardImage"></div>
      <p className="cardTitle">{name}</p>
      <p className="cardStartDay">{start_at}부터 시작</p>
      <div className="cardTag">
        <span>{auth_count_in_day}일</span>
        <span>{auth_day}일 동안</span>
      </div>
    </ChallengeCardBlock>
  );
};

export default ChallengeCard;
