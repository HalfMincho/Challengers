import React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './layouts/Header';
import MainPage from './pages/MainPage';
import ChallengeListPage from './pages/ChallengeListPage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';

const GlobalStyle = createGlobalStyle`
  .pageContainer {
    width: 75%;
    margin: 0 auto;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Route component={MainPage} exact path="/" />
      <Route
        path="/popular"
        render={() => <ChallengeListPage number={24} title="인기 챌린지" type="popular" />}
      />
      <Route
        path="/recent"
        render={() => <ChallengeListPage number={24} title="신규 챌린지" type="recent" />}
      />
      <Route component={ChallengeDetailPage} path="/challenge/detail/:id" />
    </>
  );
}

export default App;
