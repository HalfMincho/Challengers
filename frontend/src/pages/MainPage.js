import React from 'react';
import ChallengeSection from '../components/ChallengeSection';
import MainBanner from '../components/MainBanner';

const MainPage = () => {
  return (
    <div className="pageContainer">
      <MainBanner />
      <ChallengeSection number={4} preview={true} title="인기 챌린지" type="popular" />
      <ChallengeSection number={4} preview={true} title="신규 챌린지" type="recent" />
    </div>
  );
};

export default MainPage;
