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
import "./grid.scss";
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
          {/* <UpdateBounds></UpdateBounds> */}
          {/* <ZoomControl position="topright"></ZoomControl> */}

          <Polygon
            fillOpacity={0}
            positions={flip(JSON.parse(JSON.stringify(geojson))).coordinates}
          ></Polygon>

          {grid.length == 0 && <Administration></Administration>}

          <LayersControl>
            <PegadaianPoints></PegadaianPoints>
            {/* <LayersControl.Overlay name="Light">
              <WMSTileLayer
                url="https://www.lightpollutionmap.info/geoserver/gwc/service/wms"
                format="image/png"
                version="1.3.0"
                transparent="true"
                layers="PostGIS:WA_2015"
                styles="WA"
                crs="EPSG:3857"
              ></WMSTileLayer>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Land Value">
              <WMSTileLayer
                url="https://bhumi.atrbpn.go.id/proxy/http://10.20.20.142:80/geoserver/umum/wms"
                format="image/png"
                version="1.3.0"
                layers="ZNTRANGE"
                transparent={true}
                zIndex={10000}
                opacity={0.5}
              ></WMSTileLayer>
            </LayersControl.Overlay> */}
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
            {/* Heatmap */}
            {/* {poiArea.map((poidata, i) => {
              return (
                <LayersControl.Overlay key={poidata.name} name={poidata.name}>
                  <FeatureGroup>
                    <HeatmapTest
                      key={poidata.name}
                      pointsdata={poidata.points.map((point) => ({
                        lat: point.coordinates[0],
                        lng: point.coordinates[1],
                        count: 1,
                      }))}
                    ></HeatmapTest>
                  </FeatureGroup>
                </LayersControl.Overlay>
              );
            })} */}

            <TileLayersOption></TileLayersOption>
          </LayersControl>
          {/* Untuk Poi (tanpa marker cluster) */}
          {/* {poiArea.map((poi, i) => (
            <>
              {isefOpen[poi.name] && (
                <FeatureGroup key={i}>
                  {poi.points.map((point, idx) => {
                    return (
                      <Marker
                        key={idx}
                        position={point.coordinates}
                        icon={markerCollection[poi.name]}
                      >
                        <Tooltip>{point.name}</Tooltip>
                      </Marker>
                    );
                  })}
                </FeatureGroup>
              )}
            </>
          ))} */}

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

          {/* {UNTUK HEATMAP} */}
          {/* {poiArea.map((poidata, i) => (
            <>
              {isefOpen[poidata.name] && (
                <FeatureGroup key={i}>
                  <HeatmapTest
                    key={i}
                    pointsdata={poidata.points.map((point) => ({
                      lat: point.coordinates[0],
                      lng: point.coordinates[1],
                      count: 1,
                    }))}
                  ></HeatmapTest>
                </FeatureGroup>
              )}
            </>
          ))} */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Grid;
