import React, { useEffect } from "react";
import { connect } from "react-redux";
import MainPage from "../pages/MainPage";
import { getExampleData, postExampleData, getInitializeExampleData } from "../modules/exampleModules";
import { resetErrorInfo } from "../modules/error";
import { resetLoadingStatus } from "../modules/loading";

const MainPageContainer = ({
  errorGetExampleData,
  errorPostExampleData,
  exampleData,
  getExampleData,
  getInitializeExampleData,
  loadingGetExampleData,
  loadingPostExampleData,
  postExampleData,
  resetLoadingStatus,

}) => {
  useEffect(() => {
    const fn = async () => {
      try {
        await getExampleData();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
    return () => {
      getInitializeExampleData();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      resetErrorInfo();
      resetLoadingStatus();
    };
  }, []);

  return (
    <MainPage
      errorGetExampleData={errorGetExampleData}
      errorPostExampleData={errorPostExampleData}
      exampleData={exampleData}
      loadingGetExampleData={loadingGetExampleData}
      loadingPostExampleData={loadingPostExampleData}
      postExampleData={postExampleData}
    />
  );
};

export default connect(
  ({
    errorReducer,
    exampleReducer,
    loadingReducer,
  }) => ({
    exampleData: exampleReducer.exampleData,
    loadingExampleData: loadingReducer["example/GET_EXAMPLE_DATA"],
    errorGetExampleData: loadingReducer["example/GET_EXAMPLE_DATA"],
    errorPostExampleData: loadingReducer["example/POST_EXAMPLE_DATA"],
  }),
  {
    getExampleData,
    getInitializeCommentList,
    postExampleData,
    resetErrorInfo,
    resetLoadingStatus },
)(MainPageContainer);
