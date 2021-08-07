import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const LoadingPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MoonLoader />
    </div>
  );
};

export default LoadingPage;
