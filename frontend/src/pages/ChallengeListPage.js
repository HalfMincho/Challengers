import React from 'react';
import ChallengeSection from '../components/ChallengeSection';

const ChallengeListPage = ({ number, title, type }) => {
  return (
    <div className="pageContainer">
      <ChallengeSection number={number} preview={false} title={title} type={type} />
    </div>
  );
};

export default ChallengeListPage;
