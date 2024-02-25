import React from "react";
import { GiTerror } from "react-icons/gi";
import "../Styles/Error.css"
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="container">
        <span className="icon">
          <GiTerror />
        </span>
        <p>ooooops Data is no data available at the moment....</p>
        <NavLink to="/weatherInfoe">Navigate Home</NavLink>
      </div>
  );
};

export default Error;
