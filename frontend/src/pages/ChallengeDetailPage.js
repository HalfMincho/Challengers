import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import DefaultButton from '../components/DefaultButton';
import ChallengeInfo from '../components/ChallengeInfo';
import axios from 'axios';

const showChallengeInfo = (data) => {
  if (data) {
    return <ChallengeInfo data={data} />;
  }
};

const ChallengeDetailPage = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`/challenge/${id}`).then((res) => setData(res.data));
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pageContainer">
      {showChallengeInfo(data)}
      <Stack direction="row" justifyContent="center" marginTop={5} spacing={5}>
        <DefaultButton color="neutral" size="large" text="목록으로" variant="outlined" />
        <DefaultButton color="primary" size="large" text="참가하기" variant="contained" />
      </Stack>
    </div>
  );
};

export default ChallengeDetailPage;
