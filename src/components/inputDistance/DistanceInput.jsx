import React, { useState } from "react";
import dispStore from "../../context/displaystate";
import useStore from "../../context/store";
import MyContainer from "../container/MyContainer";
import "./distanceInput.scss";

function DistanceInput() {
  const [distance, setDistance] = useStore((state) => [
    state.distance,
    state.setDistance,
  ]);
  const [isDSopen, togleDS] = dispStore((state) => [
    state.isDSopen,
    state.togleDS,
  ]);
  return (
    <MyContainer title={"Distance"} isOpen={isDSopen} onTogle={() => togleDS()}>
      <div>
        <input
          type="range"
          className="distanceInput1"
          min="0"
          max="1000"
          value={distance}
          step="100"
          onChange={(e) => {
            setDistance(e.target.valueAsNumber);
          }}
        ></input>
        <input
          type="number"
          className="distanceInput2"
          value={distance}
          onChange={(e) => {
            setDistance(e.target.valueAsNumber);
          }}
        ></input>
        {""}
        meter
      </div>
    </MyContainer>
  );
}

export default DistanceInput;
