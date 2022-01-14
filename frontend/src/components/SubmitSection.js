import React from 'react';
import styled from 'styled-components';
import DefaultButton from './DefaultButton';

const StyledSection = styled.div`
  margin: 30px 0;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 10px 30px 30px 30px;

  div {
    display: flex;
    width: 100%;

    textarea {
      resize: none;
      width: 100%;
      height: 50px;
      border: 1px solid grey;
      border-radius: 5px;
    }

    button {
      margin-left: 10px;
    }
  }
`;

const SubmitSection = () => {
  return (
    <StyledSection>
      <h3>인증글 작성</h3>
      <div>
        <textarea maxLength="100" minLength="10" required></textarea>
        <DefaultButton color="primary" size="medium" text="저장" variant="contained" />
      </div>
    </StyledSection>
  );
};

export default SubmitSection;
