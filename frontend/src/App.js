import React from "react";
import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./layouts/Header";
import SignUp from "./components/SignUp";
import MainPage from "./pages/MainPage";

const GlobalStyle = createGlobalStyle`
  body {  
  }
`;

function App() {
  return (
    <>
    <GlobalStyle />
    <Header />
      <Route path="/" component={MainPage} exact />
      <Route path="/signUp" component={SignUp} />
    </>
  );
}



export default App;
