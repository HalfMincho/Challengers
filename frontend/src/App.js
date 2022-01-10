import React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './layouts/Header';
import SignUp from './components/SignUp';
import MainPage from './pages/MainPage';
import ChallengeListPage from './pages/ChallengeListPage';

const GlobalStyle = createGlobalStyle`
  body {  
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Route component={MainPage} exact path="/" />
      <Route component={SignUp} path="/signUp" />
      <Route
        path="/popular"
        render={() => <ChallengeListPage number={24} title="인기 챌린지" type="popular" />}
      />
      <Route
        path="/recent"
        render={() => <ChallengeListPage number={24} title="신규 챌린지" type="recent" />}
      />
    </>
  );
}

export default App;
