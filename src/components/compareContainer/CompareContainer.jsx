import axios from "axios";
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  ScaleControl,
} from "react-leaflet";
import geojsonBoundingBox from "geojson-bounding-box";
import { flip } from "geojson-flip";
import "./comparecontainer.scss";
import DemographyComp from "./components/DemographyComp";
import ValueComp from "./components/ValueComp";
import { MutatingDots } from "react-loader-spinner";
import PopupGrid from "../popupGrid/PopupGrid";
import CategoryValueComp from "./components/CategoryValueComp";
import EFComp from "./components/EFComp";

import { GrMapLocation } from "react-icons/gr";

function CompareContainer() {
  const [listName, setListName] = useState([]);
  const [grid, setGrid] = useState([]);
  const [bounds, setBounds] = useState([
    [6.401464409093003, 94.69495913398464],
    [-10.103552119569041, 141.444058094734],
  ]);
  const [locationGeo, setLocationGeo] = useState({});
  const [demArea, setDemArea] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/grid/saved")
      .then((result) => setListName(result.data))
      .catch(() => alert("Error Load grid name"));
  }, []);

  const updateGrid = (id) => {
    setGrid([]);

    if (id !== "-") {
      setLoading(true);
      const location = listName.filter((e) => e._id == id)[0].location;
      setLocationGeo(location);
      const boundArray = geojsonBoundingBox(location);
      setBounds([
        [boundArray[1], boundArray[0]],
        [boundArray[3], boundArray[2]],
      ]);
      axios
        .post(process.env.REACT_APP_API_URL + "/api/grid/saved/" + id)
        .then((response) => {
          let gridrespon = response.data;
          setGrid(gridrespon);
          setDemArea(getDemographyArea(gridrespon));
          setLoading(false);
        });
    } else {
      setGrid([]);
      setLocationGeo({});
      setDemArea({});
    }
  };

  const MapRef = useRef();
  useMemo(() => {
    console.log("boundupdated");
    MapRef?.current?.fitBounds(bounds);
  }, [bounds]);

  return (
    <div className="CompareContainer">
      <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "8px",
          }}
        >
          <GrMapLocation color="white"></GrMapLocation>
        </div>
        <div>
          <select
            className="selector"
            onChange={(e) => updateGrid(e.target.value)}
          >
            <option value={"-"}>-</option>
            {listName &&
              listName.map((e) => <option value={e._id}>{e.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mapContainer">
        {isLoading && (
          <div className="loading" style={{}}>
            <div>
              <MutatingDots
                height="100"
                width="100"
                color="white"
                secondaryColor="#e4f8fe"
              ></MutatingDots>
            </div>
          </div>
        )}

        <MapContainer bounds={bounds} ref={MapRef} zoomControl={false}>
          <TileLayer url="https://api.mapbox.com/styles/v1/rosyidi/ckyjqu6j3k58t15pc67odh67v/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9zeWlkaSIsImEiOiJja3lqcXJ1aGowNmQ0MnZydW83OTZoNnlzIn0.p5ZLTV3RD7IYWhsmzLQ7tw" />
          <ScaleControl maxWidth={100}></ScaleControl>

          {locationGeo && (
            <Polygon
              fillOpacity={0}
              positions={
                flip(JSON.parse(JSON.stringify(locationGeo))).coordinates || {}
              }
            ></Polygon>
          )}

          {grid.map((data, i) => {
            return (
              <Polygon
                key={i}
                fillColor={getColor(data.value)}
                color="white"
                dashArray={3}
                opacity={1}
                weight={0.8}
                fillOpacity={0.4}
                positions={
                  flip(JSON.parse(JSON.stringify(data.location))).coordinates
                }
              >
                <PopupGrid data={data}></PopupGrid>
              </Polygon>
            );
          })}

          {/* //allocationaccess */}
        </MapContainer>
      </div>

      {grid.length > 0 && (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <CategoryValueComp data={grid}></CategoryValueComp>
            <EFComp data={grid}></EFComp>
          </div>

          <ValueComp
            grid={grid}
            onCellClick={(param) => {
              const boundArray = geojsonBoundingBox(param.row.location);
              setBounds([
                [boundArray[1], boundArray[0]],
                [[boundArray[3], boundArray[2]]],
              ]);
            }}
          ></ValueComp>
          <DemographyComp demography={demArea}></DemographyComp>
        </>
      )}
    </div>
  );
}

export default CompareContainer;

const getColor = (d) => {
  return d >= 0.8
    ? "#800026"
    : d >= 0.6
    ? "#BD0026"
    : d >= 0.4
    ? "#FC4E2A"
    : d >= 0.2
    ? "#FEB24C"
    : "#FFEDA0";
};

const getPoiArea = (grid) => {
  if (grid[0].poi) {
    let demographyObject = {};
    //create object with poiname as property
    grid[0].poi.forEach((poidata) => {
      demographyObject[poidata.name] = { points: [] };
    });

    grid.forEach((griddata) => {
      //merge points data
      griddata.poi.forEach((poidata) => {
        demographyObject[poidata.name]["points"] = demographyObject[
          poidata.name
        ]["points"].concat(poidata.points);
      });
    });
    //object to list
    var keys = Object.keys(demographyObject);
    var poiResume = [];
    keys.forEach((key) => {
      poiResume.push({
        name: key,
        points: demographyObject[key].points,
      });
    });
    return poiResume;
  } else {
    var poiResume = [];
    return poiResume;
  }
};

const getDemographyArea = (grid) => {
  if (grid[0].agegenderDetails) {
    let demographyObject = {};
    //create object with gander as property as property
    grid[0].agegenderDetails.forEach((e) => {
      demographyObject[e.name] = 0;
    });

    grid.forEach((griddata) => {
      //merge points data
      griddata.agegenderDetails.forEach((e) => {
        demographyObject[e.name] = demographyObject[e.name] + e.value;
      });
    });
    return demographyObject;
  } else {
    return {};
  }
};
