import React from "react";
import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./layouts/Header";
import SignUp from "./components/SignUp";

const GlobalStyle = createGlobalStyle`
  body {  
  }
`;

function App() {
  return (
    <>
    <GlobalStyle />
    {/* <div className="App">
      <Route path="/page" component={} exact />
    </div> */}
    <Header />
    <SignUp />
    </>
  );
}



export default App;
