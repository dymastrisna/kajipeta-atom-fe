import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Container2 from "./Container2";
import "./valuecom.scss";

function ValueComp({ grid, onCellClick }) {
  const valuedata = grid || [];
  const newColumn = [];

  if (typeof valuedata[0] !== "undefined") {
    if (typeof valuedata[0].poi !== "undefined") {
      valuedata[0].poi.forEach((e) => {
        newColumn.push({
          type: "double",
          field: e.name,
          headerName: e.name,
          width: 75,
        });
      });

      valuedata.forEach((element) => {
        element["poi"].forEach((poidata) => {
          element[poidata.name] = poidata["jumlah"];
        });
      });
    }
  }
  console.log(valuedata);

  return (
    <Container2 title={"Detail Value"}>
      <div className="valuecom">
        <DataGrid
          columns={[
            {
              type: "double",
              field: "value",
              headerName: "Value",
              width: 75,
            },
            {
              field: "desa",
              headerName: "Location",
              width: 150,
            },
          ].concat(newColumn)}
          style={{ fontSize: "11px" }}
          isRowSelectable={false}
          hideFooter={true}
          headerHeight={40}
          rowHeight={30}
          rows={valuedata}
          getRowId={(row) => row._id}
          onCellClick={(param, e) => onCellClick(param)}
          //   onCellClick={(param, e) => {
          //     const boundArray = geojsonBoundingBox(param.row.location);
          //     setBounds([
          //       [boundArray[1], boundArray[0]],
          //       [[boundArray[3], boundArray[2]]],
          //     ]);
          //   }}
        ></DataGrid>
      </div>
    </Container2>
  );
}

export default ValueComp;
