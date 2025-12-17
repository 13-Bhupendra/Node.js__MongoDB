import React from "react";
import "../style/loading.css";

const Loading = () => {
  return (
    <div className="loadingWrapper">
      <div className="loader"></div>
      <p className="loadingText">Loading...</p>
    </div>
  );
};

export default Loading;
