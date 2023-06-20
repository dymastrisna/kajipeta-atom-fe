import React from "react";
import PopupContainer from "./PopupContainer";

function PopupValue({ data }) {
  const getColor = (d) => {
    return d >= 0.8
      ? "rgb(128, 0, 38, 0.6)"
      : d >= 0.6
      ? "rgb(189, 0, 38,0.6)"
      : d >= 0.4
      ? "rgb(252, 78, 42, 0.6)"
      : d >= 0.2
      ? "rgb(254, 178, 76, 0.6)"
      : "rgb(255, 237, 160, 0.6)";
  };
  const getCategory = (d) => {
    return d >= 0.8
      ? "Value 1"
      : d >= 0.6
      ? "Value 2"
      : d >= 0.4
      ? "Value 3"
      : d >= 0.2
      ? "Value 4"
      : "Value 5";
  };

  return (
    <PopupContainer title={"Value"}>
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            background: getColor(data.value),
            height: "15px",
            width: "40px",
            borderRadius: "4px",
          }}
        ></div>
        <div>{getCategory(data.value)} :</div>
        <div style={{ fontWeight: "bold" }}> {data.value}</div>
      </div>
    </PopupContainer>
  );
}

export default PopupValue;
