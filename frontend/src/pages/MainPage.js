import React from 'react';
import styled from 'styled-components';
import ChallengeSection from '../components/ChallengeSection';
import MainBanner from '../components/MainBanner';
import '../styles/MainPage.scss';

const MainPageContainer = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const MainPage = () => {
  return (
    <MainPageContainer>
      <MainBanner />
      <ChallengeSection number={4} title="인기 챌린지" type="popular" />
      <ChallengeSection number={4} title="신규 챌린지" type="recent" />
    </MainPageContainer>
  );
};

export default MainPage;
