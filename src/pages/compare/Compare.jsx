import React from "react";
import CompareContainer from "../../components/compareContainer/CompareContainer";
import "./compare.scss";

function Compare() {
  return (
    <div className="compare">
      <p className="title">Comparison</p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowY: "scroll",
        }}
      >
        <CompareContainer></CompareContainer>
        <CompareContainer></CompareContainer>
      </div>
    </div>
  );
}
export default Compare;
