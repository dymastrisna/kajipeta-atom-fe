import React from "react";
import dispStore from "../../../context/displaystate";
import MyContainer from "../../container/MyContainer";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./sizeselector.scss";
import useStore from "../../../context/store";
import admState from "../../../context/admstate";

const marks = [
  {
    value: 500,
    label: "1/2",
  },
  {
    value: 1000,
    label: "1",
  },
  {
    value: 2000,
    label: "2",
  },
  {
    value: 3000,
    label: "3",
  },
  {
    value: 4000,
    label: "4",
  },
];

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

function minRangeValue(kabId, kecId) {
  if (kabId == "all") {
    return 2000;
  } else if (kecId == "all") {
    return 1000;
  } else {
    return 500;
  }
}

function Sizeselector() {
  const [isGSopen, togleGS] = dispStore((state) => [
    state.isGSopen,
    state.togleGS,
  ]);
  const [gridsize, setGridSize] = useStore((state) => [
    state.gridsize,
    state.setGridSize,
  ]);
  const [kabId, kecId] = admState((state) => [state.kabId, state.kecId]);
  return (
    <MyContainer title={"Grid Size"} onTogle={togleGS} isOpen={isGSopen}>
      <Box padding={1}>
        <Slider
          onChange={(e) => {
            setGridSize(e.target.value);
          }}
          aria-label="Restricted values"
          // defaultValue={gridsize}
          value={gridsize}
          valueLabelFormat={valueLabelFormat}
          step={null}
          min={minRangeValue(kabId, kecId)}
          max={4000}
          marks={marks}
        />
      </Box>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "-10px",
          fontSize: "12px",
          color: "gray",
        }}
      >
        Kilometers
      </div>
    </MyContainer>
  );
}

export default Sizeselector;
