import React, { useEffect, useState } from 'react';
import DefaultButton from '../components/DefaultButton';
import ChallengeInfo from '../components/ChallengeInfo';
import axios from 'axios';
import SubmitSection from '../components/SubmitSection';
import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  button {
    margin: 0 20px;
  }
`;

const ChallengeDetailPage = ({ match }) => {
  const [data, setData] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`/challenge/${id}`).then((res) => setData(res.data));
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pageContainer">
      {data && <ChallengeInfo data={data} />}
      <SubmitSection />
      <Buttons>
        <DefaultButton color="neutral" size="large" text="목록으로" variant="outlined" />
        <DefaultButton color="primary" size="large" text="참가하기" variant="contained" />
      </Buttons>
    </div>
  );
};

export default ChallengeDetailPage;
