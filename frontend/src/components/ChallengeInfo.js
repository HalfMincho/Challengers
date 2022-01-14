import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { ShoppingCartOutlined, BookmarkBorder } from '@mui/icons-material';
import theme from '../styles/theme';
import styled from 'styled-components';
import DefaultButton from './DefaultButton';
import Tag from './Tag';

const InfoContainer = styled.div`
  margin: 30px 0;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 30px;

  section {
    clear: both;
    margin-bottom: 40px;

    * {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  .buttons {
    float: right;
  }
`;

const ChallengeInfo = ({ data }) => {
  return (
    <ThemeProvider theme={theme}>
      <InfoContainer>
        <div className="buttons">
          <IconButton color="primary" size="large">
            <BookmarkBorder fontSize="inherit" padding="3px" />
          </IconButton>
          <IconButton color="primary" size="large">
            <ShoppingCartOutlined fontSize="inherit" padding="3px" />
          </IconButton>
          <DefaultButton color="neutral" size="small" text="문의하기" variant="outlined" />
        </div>
        <section>
          <p>{data.start_at}부터 시작</p>
          <h2>{data.name}</h2>
          <div className="dateInfo">
            <Tag text={data.auth_day} />
            <Tag text={data.auth_count_in_day} />
            <span>
              {data.start_at}~{data.end_at}
            </span>
          </div>
          <p>참가비 {data.cost}원</p>
        </section>
        <section>
          <h3>인증 방법</h3>
          <p>{data.description}</p>
        </section>
      </InfoContainer>
    </ThemeProvider>
  );
};

export default ChallengeInfo;
