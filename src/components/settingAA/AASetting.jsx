import React from "react";
import DistanceInput from "../inputDistance/DistanceInput";
import EFInput from "../inputEF/EFInput";
import ModeInput from "../inputMode/ModeInput";
import GridTable from "../gridTable/GridTable";

import GenderInput from "../inputGender/GenderInput";

import InputSaveGrid from "../inpusaveGrid/InputSaveGrid";
import AAButton from "./AAButton";
import "./aaSetting.scss";

function AASetting() {
  return (
    <div className="aaSettingContainer">
      <p className="title">Location Access</p>

      <GridTable></GridTable>
      <EFInput></EFInput>
      <GenderInput></GenderInput>

      <ModeInput></ModeInput>
      <DistanceInput></DistanceInput>
      {/* Add or Delete Button */}
      <AAButton></AAButton>

      <InputSaveGrid></InputSaveGrid>
    </div>
  );
}

export default AASetting;
