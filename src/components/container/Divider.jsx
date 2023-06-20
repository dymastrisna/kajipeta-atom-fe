import React from "react";
import "./divider.scss";

const Divider = ({ children }) => {
  return (
    <div className="divider">
      <p>{children}</p>
      <div className="line"></div>
    </div>
  );
};

export default Divider;
