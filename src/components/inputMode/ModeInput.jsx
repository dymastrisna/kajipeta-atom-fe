import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { FaWalking, FaMotorcycle, FaCarAlt } from "react-icons/fa";
import dispStore from "../../context/displaystate";
import MyContainer from "../container/MyContainer";

import "./modeinput.scss";

function ModeInput() {
  const [mode, setMode] = useState("walk");
  const handleChange = (event, newmode) => {
    if (newmode !== null) {
      setMode(newmode);
    }
  };
  const [isMDopen, togleMD] = dispStore((state) => [
    state.isMDopen,
    state.togleMD,
  ]);
  return (
    <MyContainer title={"Mode"} isOpen={isMDopen} onTogle={() => togleMD()}>
      <div
        style={{ marginTop: "10px", justifyContent: "center", display: "flex" }}
      >
        <ToggleButtonGroup
          color="info"
          value={mode}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          className="toglleButton"
        >
          <ToggleButton value="walk">
            <FaWalking size={20}></FaWalking>
          </ToggleButton>
          <ToggleButton value="motorcycle">
            <FaMotorcycle size={20}></FaMotorcycle>
          </ToggleButton>
          <ToggleButton value="drive">
            <FaCarAlt size={20}></FaCarAlt>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </MyContainer>
  );
}

export default ModeInput;
