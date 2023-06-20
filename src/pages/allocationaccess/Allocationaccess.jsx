import React, { useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  ZoomControl,
  useMapEvent,
  Tooltip,
  LayersControl,
  WMSTileLayer,
  FeatureGroup,
} from "react-leaflet";
import AASetting from "../../components/settingAA/AASetting";
import useStore from "../../context/store";
import "./allocationaccess.scss";
import markerCollection from "../../components/markers";
import { flip } from "geojson-flip";
import PegadaianPoints from "../../components/leaflet-components/PegadaianPoints";
import TileLayersOption from "../../components/TileLayers";
import admState from "../../context/admstate";

import PopupLocationAccess from "../../components/popupGrid/PopupLocationAccess";

function Allocationaccess() {
  const [bounds] = admState((state) => [state.bounds]);
  const [grid, listisolineData, addIsoline, deleteIsoline, editingstatus] =
    useStore((state) => [
      state.grid,
      state.listisolineData,
      state.addIsoline,
      state.deleteIsoline,
      state.editMode,
    ]);
  const ClickMapComponent = () => {
    const map = useMapEvent({
      click: (e) => {
        if (editingstatus === "add") {
          addIsoline(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  };

  const MapRef = useRef();
  useMemo(() => {
    console.log("boundupdated");
    MapRef?.current?.fitBounds(bounds, {
      animate: true,
      pan: {
        duration: 2,
      },
    });
  }, [bounds]);

  return (
    <div className="allocationaccess">
      <AASetting></AASetting>
      <div className="map">
        <MapContainer bounds={bounds} ref={MapRef} zoomControl={false}>
          {/* <ZoomControl position="topright"></ZoomControl> */}
          <LayersControl>
            <PegadaianPoints></PegadaianPoints>
            <TileLayersOption></TileLayersOption>

            <LayersControl.Overlay name="Grid" checked>
              <FeatureGroup>
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
                        flip(JSON.parse(JSON.stringify(data.location)))
                          .coordinates
                      }
                    ></Polygon>
                  );
                })}
              </FeatureGroup>
            </LayersControl.Overlay>
          </LayersControl>
          <ClickMapComponent></ClickMapComponent>

          {listisolineData &&
            listisolineData.map((isolineData) => {
              return isolineData.poi.map((poi) => {
                return poi.points.map((point) => {
                  return (
                    <Marker
                      position={point.coordinates}
                      icon={markerCollection[poi.name]}
                    >
                      <Tooltip>{point.name}</Tooltip>
                    </Marker>
                  );
                });
              });
            })}

          {listisolineData &&
            listisolineData.map((isolineData, i) => {
              return (
                <Polygon
                  color="#01a8cc"
                  fillColor="#01a8cc"
                  key={i}
                  weight={0.5}
                  positions={
                    flip(JSON.parse(JSON.stringify(isolineData.geometry)))
                      .coordinates
                  }
                ></Polygon>
              );
            })}
          {listisolineData &&
            listisolineData.map((isolineData, i) => {
              return (
                <Marker
                  key={i}
                  position={isolineData.latlng}
                  eventHandlers={{
                    preclick: (e) => {},
                    click: (e) => {
                      if (editingstatus === "delete") {
                        e.target.closePopup();
                        deleteIsoline(e.latlng.lat, e.latlng.lng);
                      }
                    },
                  }}
                >
                  <PopupLocationAccess data={isolineData}></PopupLocationAccess>
                  {/* <Popup autoClose={false} closeOnClick={false}>
                    <table>
                      <tr>
                        <td>Penduduk</td>
                        <td>: {isolineData.citizen}</td>
                      </tr>
                      <tr>
                        <td>Luas</td>
                        <td>: {isolineData.area} m&#178;</td>
                      </tr>
                      <tr>
                        <td>Jangkauan</td>
                        <td>: {isolineData.reachbility} %</td>
                      </tr>
                      {isolineData.poi?.map((e) => (
                        <tr>
                          <td>{e.name}</td>
                          <td>: {e.jumlah}</td>
                        </tr>
                      ))}
                    </table>
                  </Popup> */}
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
}

export default Allocationaccess;

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
