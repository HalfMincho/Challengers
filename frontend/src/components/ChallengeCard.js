import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tag from './Tag';

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
    margin-top: 10px;
    font-size: 1.2em;
    font-weight: 500;
  }

  .cardStartDay {
    margin-top: 0;
    color: grey;
    font-size: 0.9em;
  }
`;

const ChallengeCard = ({ auth_count_in_day, auth_day, id, name, start_at }) => {
  return (
    <Link to={`/challenge/detail/${id}`}>
      <ChallengeCardBlock>
        <div className="cardImage"></div>
        <p className="cardTitle">{name}</p>
        <p className="cardStartDay">{start_at}부터 시작</p>
        <div>
          <Tag text={auth_count_in_day} />
          <Tag text={auth_day} />
        </div>
      </ChallengeCardBlock>
    </Link>
  );
};

export default ChallengeCard;
