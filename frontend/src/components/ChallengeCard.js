import React from 'react';
import styled from 'styled-components';

const ChallengeCardBlock = styled.div`
  * {
    margin-bottom: 5px;
  }

  .cardImage {
    height: 200px;
    width: 250px;
    border: 1px solid grey;
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

const ChallengeCard = () => {
  return (
    <ChallengeCardBlock>
      <div className="cardImage"></div>
      <p className="cardTitle">아침 공복에 물 한 잔</p>
      <p className="cardStartDay">모레부터 시작</p>
      <div className="cardTag">
        <span>매일</span>
        <span>2주 동안</span>
      </div>
    </ChallengeCardBlock>
  );
};

export default ChallengeCard;
