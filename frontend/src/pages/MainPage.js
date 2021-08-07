import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../styles/MainPage.scss";
import LoadingPage from "../pages/LoadingPage";
import { loadComponent } from "../lib/utils";

const MainPageBody = ({
  errorGetExampleData,
  errorPostExampleData,
  exampleData,
  loadingGetExampleData,
  loadingPostExampleData,
  postExampleData
}) => {
  return (
    <>
      <div className="main-page-body-wrapper">
        {loadComponent(
          loadingGetExampleData,
          <LoadingPage />,
          <div />
        )}
      </div>
    </>
  );
};

const MainPage = ({
  errorGetExampleData,
  errorPostExampleData,
  exampleData,
  loadingGetExampleData,
  loadingPostExampleData,
  postExampleData
}) => {
  return (
    <div className="main-page-wrapper">
      <Header />
      <MainPageBody
        errorGetExampleData={errorGetExampleData}
        errorPostExampleData={errorPostExampleData}
        exampleData={exampleData}
        loadingGetExampleData={loadingGetExampleData}
        loadingPostExampleData={loadingPostExampleData}
        postExampleData={postExampleData}
      />
      <Footer />
    </div>
  );
};

export default MainPage;
