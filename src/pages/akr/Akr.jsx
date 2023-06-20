import React, { useMemo, useRef, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  ZoomControl,
  Tooltip,
  LayersControl,
  FeatureGroup,
  useMapEvents,
  WMSTileLayer,
} from "react-leaflet";
import { flip } from "geojson-flip";
import GridSetting from "../../components/settingGrid/GridSetting";
import SearchBar from "../../components/search/SearchBar";
import useStore from "../../context/store";
import "./akr.scss";
import markerCollection from "../../components/markers";
import PegadaianPoints from "../../components/leaflet-components/PegadaianPoints";
import { MutatingDots } from "react-loader-spinner";
import HeatmapTest from "../../components/leaflet-components/HeatmapLeaflet";
import efPointStore from "../../context/efpoint";
import TileLayersOption from "../../components/TileLayers";
import PopupGrid from "../../components/popupGrid/PopupGrid";
import MarkerClusterExmp from "../../components/leaflet-components/MarkerClusterExmp";
import axios from "axios";
import Administration from "../../components/Administration";
import admState from "../../context/admstate";

const Grid = () => {
  const [geojson, grid, poiArea, isLoading, poiselected] = useStore((state) => [
    state.geojson,
    state.grid,
    state.poiResume,
    state.isLoading,
    state.poi,
  ]);
  const [bounds, setBounds, setProvGeo, provGeo] = admState((state) => [
    state.bounds,
    state.setBounds,
    state.setprovGeo,
    state.provGeo,
  ]);
  const [isefOpen] = efPointStore((state) => [state.isOpen]);

  function UpdateBounds() {
    const map = useMapEvents({
      dragend: () => {
        setBounds([
          [map.getBounds()._northEast.lat, map.getBounds()._northEast.lng],
          [map.getBounds()._southWest.lat, map.getBounds()._southWest.lng],
        ]);
      },
      zoomend: () => {
        setBounds([
          [map.getBounds()._northEast.lat, map.getBounds()._northEast.lng],
          [map.getBounds()._southWest.lat, map.getBounds()._southWest.lng],
        ]);
      },
    });
    return null;
  }

  //rerendered every bounds change
  const MapRef = useRef();
  useMemo(() => {
    console.log("boundupdated");
    MapRef?.current?.fitBounds(bounds, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // MapRef?.current?.setView(bounds[0][0], 5, { animate: true, duration: 30 });
  }, [bounds]);

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

  useState(() => {
    if (provGeo.length == 0) {
      setProvGeo();
    }
  }, []);

  return (
    <div className="grid">
      <GridSetting></GridSetting>
      <div className="map">
        {isLoading ? (
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
        ) : (
          <></>
        )}
        <div className="search">
          {grid.length === 0 ? <SearchBar></SearchBar> : <></>}
        </div>
        <MapContainer bounds={bounds} ref={MapRef} zoomControl={false}>
          <Polygon
            fillOpacity={0}
            positions={flip(JSON.parse(JSON.stringify(geojson))).coordinates}
          ></Polygon>

          {grid.length == 0 && <Administration></Administration>}

          <LayersControl>
            <PegadaianPoints></PegadaianPoints>
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
                    >
                      <PopupGrid data={data}></PopupGrid>
                    </Polygon>
                  );
                })}
              </FeatureGroup>
            </LayersControl.Overlay>
            <TileLayersOption></TileLayersOption>
          </LayersControl>
          {poiArea.map((poi, i) => (
            <>
              {isefOpen[poi.name] && (
                <MarkerClusterExmp
                  category={
                    poiselected.filter((e) => e.name == poi.name)[0].category
                  }
                  point={poi.points}
                  poiName={poi.name}
                ></MarkerClusterExmp>
              )}
            </>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Grid;
