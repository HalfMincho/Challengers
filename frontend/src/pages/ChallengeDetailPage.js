import React from 'react';
import Stack from '@mui/material/Stack';
import DefaultButton from '../components/DefaultButton';
import ChallengeInfo from '../components/ChallengeInfo';

const ChallengeDetailPage = () => {
  return (
    <div className="pageContainer">
      <ChallengeInfo />
      <Stack direction="row" spacing={5}>
        <DefaultButton color="neutral" size="large" text="목록으로" variant="outlined" />
        <DefaultButton color="primary" size="large" text="참가하기" variant="contained" />
      </Stack>
    </div>
  );
};

export default ChallengeDetailPage;
