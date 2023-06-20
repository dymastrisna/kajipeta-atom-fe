import React from "react";
import { NavLink } from "react-router-dom";
import "./toaa.scss";

function ToAllocationAcces() {
  return (
    <NavLink to={"/locationaccess"}>
      <div className="toAA">Location Access</div>
    </NavLink>
  );
}

export default ToAllocationAcces;
