import React from 'react';
import styled from 'styled-components';
import ChallengeSection from '../components/ChallengeSection';

const ChallengeListContainer = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const ChallengeListPage = ({ number, title, type }) => {
  return (
    <ChallengeListContainer>
      <ChallengeSection number={number} preview={false} title={title} type={type} />
    </ChallengeListContainer>
  );
};

export default ChallengeListPage;
