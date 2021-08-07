import React from "react";
import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";

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
    </>
  );
}



export default App;
