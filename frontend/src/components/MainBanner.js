import React from 'react';
import styled from 'styled-components';

const MainBannerContainer = styled.div`
  img {
    width: 100%;
  }
`;

const MainBanner = () => {
  return (
    <MainBannerContainer>
      <img alt="Banner Image" src="/img/MainBannerImage.jpg" />
    </MainBannerContainer>
  );
};

export default MainBanner;
