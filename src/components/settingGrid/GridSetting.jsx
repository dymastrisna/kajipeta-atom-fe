import "./gridSetting.scss";

import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";
import useStore from "../../context/store";
import GenderInput from "../inputGender/GenderInput";
import EFInput from "../inputEF/EFInput";
import GridTable from "../gridTable/GridTable";

import InputSaveGrid from "../inpusaveGrid/InputSaveGrid";
import Divider from "../container/Divider";
import EFResult from "../efResult/EFResult";
import efPointStore from "../../context/efpoint";
import ToAllocationAcces from "./ToAllocationAcces";
import DemographyResult from "../demographyResult/DemographyResult";
import Location from "../location/Location";
import Sizeselector from "./sizeSelector/Sizeselector";
import admState from "../../context/admstate";

function GridSetting() {
  const [analyze, grid, setGrid, getClientData, poi, setIsLoading] = useStore(
    (state) => [
      state.analyze,
      state.grid,
      state.setGrid,
      state.getClientData,
      state.poi,
      state.setIsLoading,
    ]
  );

  const [agegender, education, profession, religion] = useStore((state) => [
    state.agegender,
    state.education,
    state.profession,
    state.religion,
  ]);
  const [locationName] = admState((state) => [state.locationName]);
  const [setAllClose] = efPointStore((state) => [state.setAllClose]);
  const isAnyInput =
    poi.length > 0 ||
    agegender.length > 0 ||
    education.length > 0 ||
    profession.length > 0 ||
    religion.length > 0;
  return (
    <div className="gridSettingContainer">
      <p className="title">Grid</p>
      <div className="locationName">
        <GrMapLocation color="white"></GrMapLocation>
        {locationName}
      </div>

      {grid.length === 0 ? (
        <>
          <Divider>Location</Divider>
          {/* Search Location by DropDown */}
          <Location></Location>
          <Divider>Parameter</Divider>
          {/* Input Parameter by Demogpraphy */}
          <GenderInput></GenderInput>
          {/* Input Parameter by Economic Factor */}
          <EFInput></EFInput>
          {/* Grid Size Selector */}
          <Sizeselector></Sizeselector>
          {isAnyInput && (
            <button
              className="analyzeButton"
              onClick={() => {
                setIsLoading(true);
                setGrid([]);
                analyze();
                getClientData();
              }}
            >
              Analyze
            </button>
          )}
        </>
      ) : (
        <>
          <div className="backdivider">
            <IoMdArrowRoundBack
              className="backIcon"
              onClick={(e) => {
                setGrid([]);
                setAllClose();
              }}
            ></IoMdArrowRoundBack>
            <div className="dividerelement">
              <Divider>Result</Divider>
            </div>
          </div>
          <DemographyResult></DemographyResult>
          <EFResult></EFResult>
          <GridTable></GridTable>
          <InputSaveGrid></InputSaveGrid>
          <ToAllocationAcces></ToAllocationAcces>
        </>
      )}
    </div>
  );
}

export default GridSetting;
