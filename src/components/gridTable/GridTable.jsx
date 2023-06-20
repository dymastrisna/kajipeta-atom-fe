import React, { useEffect, useState } from "react";
import "./gridTable.scss";
import useStore from "../../context/store";
import { DataGrid } from "@mui/x-data-grid";
import geojsonBoundingBox from "geojson-bounding-box";
import MyContainer from "../container/MyContainer";
import dispStore from "../../context/displaystate";
import admState from "../../context/admstate";

function GridTable() {
  const [grid] = useStore((state) => [state.grid]);
  const [setBounds] = admState((state) => [state.setBounds]);
  const [isSCopen, togleSC] = dispStore((state) => [
    state.isSCopen,
    state.togleSC,
  ]);
  const [poiArea, valueCount] = useStore((state) => [
    state.poiResume,
    state.categoryNumber,
  ]);
  const [isdetails, setIsDetails] = useState(false);

  const colors = [
    "rgb(128, 0, 38, 0.6)",
    "rgb(189, 0, 38,0.6)",
    "rgb(252, 78, 42, 0.6)",
    "rgb(254, 178, 76, 0.6)",
    "rgb(255, 237, 160, 0.6)",
  ];
  return (
    <>
      <MyContainer title={"Value"} isOpen={isSCopen} onTogle={() => togleSC()}>
        <div
          style={{
            gap: "5px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
            marginTop: "5px",
          }}
        >
          {valueCount.map((value, i) => (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "3px",
                  marginTop: "5px",
                  backgroundColor: colors[i],
                }}
                key={i}
              ></div>
              <div style={{ fontSize: "13px", fontWeight: "500" }}>
                value {i + 1} :
              </div>
              <div>{valueCount[i].jumlah}</div>
            </div>
          ))}
        </div>

        <div className="details" onClick={(e) => setIsDetails(!isdetails)}>
          {isdetails ? <>Hide Details</> : <>Show Details</>}
        </div>

        {isdetails ? (
          <div
            className="tableValue"
            style={{
              height: "300px",
              width: "100%",
              marginTop: "10px",
              overflowY: "scroll",
              fontSize: "10px",
            }}
          >
            <DataGrid
              columns={[
                {
                  type: "double",
                  field: "value",
                  headerName: "Value",
                  width: 100,
                  flex: 1.5,
                },
                {
                  field: "desa",
                  headerName: "Location",
                  width: 100,
                  flex: 3,
                },
              ]}
              style={{ fontSize: "11px" }}
              isRowSelectable={false}
              hideFooter={true}
              headerHeight={30}
              rowHeight={30}
              rows={grid}
              getRowId={(row) => row._id}
              onCellClick={(param, e) => {
                const boundArray = geojsonBoundingBox(param.row.location);
                setBounds([
                  [boundArray[1], boundArray[0]],
                  [[boundArray[3], boundArray[2]]],
                ]);
              }}
            ></DataGrid>
          </div>
        ) : (
          <></>
        )}
      </MyContainer>
    </>
  );
}

export default GridTable;
