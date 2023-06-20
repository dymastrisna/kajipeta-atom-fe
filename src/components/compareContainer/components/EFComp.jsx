import React from "react";
import Container2 from "./Container2";

function EFComp({ data }) {
  const poiResume = getPoiResume(data);
  return (
    <Container2 title="Economic Factors">
      <div style={{ height: "150px", overflowY: "scroll" }}>
        {poiResume &&
          poiResume.map((poi, i) => (
            <div style={{ display: "flex" }} key={i}>
              <div style={{ flex: "2" }}>{poi.name}</div>
              <div style={{ flex: "1" }}>: </div>
              <div style={{ flex: "2" }}>{poi.points.length}</div>
            </div>
          ))}
      </div>
    </Container2>
  );
}

export default EFComp;

const getPoiResume = (grid) => {
  if (grid[0].poi) {
    let poiObject = {};
    //create object with poiname as property
    grid[0].poi.forEach((poidata) => {
      poiObject[poidata.name] = { points: [] };
    });

    grid.forEach((griddata) => {
      //merge points data
      griddata.poi.forEach((poidata) => {
        poiObject[poidata.name]["points"] = poiObject[poidata.name][
          "points"
        ].concat(poidata.points);
      });
    });
    //object to list
    var keys = Object.keys(poiObject);
    var poiResume = [];
    keys.forEach((key) => {
      poiResume.push({
        name: key,
        points: poiObject[key].points,
        isLoading: false,
      });
    });
  } else {
    var poiResume = [];
  }
  return poiResume;
};
