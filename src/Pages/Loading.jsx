import React from "react";
import "../Styles/Loader.css"
import { Triangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loader-container">
      <Triangle
        height="80"
        width="80"
        color="rgb(137, 43, 224)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
