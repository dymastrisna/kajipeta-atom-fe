import React from "react";
import { Pane, Polygon, Tooltip } from "react-leaflet";
import useStore from "../context/store";
import { flip } from "geojson-flip";
import admState from "../context/admstate";

function Administration() {
  const [
    kelGeom,
    kecGeom,
    kabkotGeom,
    provGeom,
    setBounds,
    setkel,
    setkec,
    setkabkot,
    setKelId,
    setName,
  ] = admState((state) => [
    state.kelGeo,
    state.kecGeo,
    state.kabGeo,
    state.provGeo,
    state.setBounds,
    state.setkelGeo,
    state.setkecGeo,
    state.setkabGeo,
    state.setkelId,
    state.setLocationName,
  ]);
  const [setGeojson, setGridSize] = useStore((state) => [
    state.setGeojson,
    state.setGridSize,
  ]);

  const eventHandlersPolygon = {
    mouseover: (e) => {
      e.target.setStyle({
        fillOpacity: 0.4,
      });
    },
    mouseout: (e) => {
      e.target.setStyle({
        fillOpacity: 0.1,
      });
    },
  };
  return (
    <>
      {provGeom.map((provdata, i) => (
        <Pane key={provdata._id} style={{ zIndex: 3000 }}>
          <Polygon
            eventHandlers={{
              click: (e) => {
                setBounds(e.target.getBounds());
                setkabkot(provdata._id);
                setGeojson(provdata.location);
                setName(provdata.NAMA);
                setGridSize(2000);
              },
              ...eventHandlersPolygon,
            }}
            key={provdata._id}
            fillOpacity={0.1}
            weight={0.5}
            positions={
              flip(JSON.parse(JSON.stringify(provdata.location))).coordinates
            }
          >
            {/* <Tooltip>{provdata.NAMA}</Tooltip> */}
          </Polygon>
        </Pane>
      ))}
      {kabkotGeom.map((kabkotGeom) => (
        <Pane key={kabkotGeom._id} style={{ zIndex: 14000 }}>
          <Polygon
            eventHandlers={{
              click: (e) => {
                setBounds(e.target.getBounds());
                setkec(kabkotGeom._id);
                setGeojson(kabkotGeom.location);
                setName(kabkotGeom.NAMA);
                setGridSize(2000);
              },
              ...eventHandlersPolygon,
            }}
            key={kabkotGeom._id}
            fillOpacity={0.1}
            weight={0.5}
            fillColor="orange"
            color="orange"
            positions={
              flip(JSON.parse(JSON.stringify(kabkotGeom.location))).coordinates
            }
          >
            {/* <Tooltip>{kabkotGeom.NAMA}</Tooltip> */}
          </Polygon>
        </Pane>
      ))}

      {kecGeom.map((kecGeom) => (
        <Pane key={kecGeom._id} style={{ zIndex: 15000 }}>
          <Polygon
            eventHandlers={{
              click: (e) => {
                setBounds(e.target.getBounds());
                setkel(kecGeom._id);
                setGeojson(kecGeom.location);
                setName(kecGeom.NAMA);
              },
              ...eventHandlersPolygon,
            }}
            key={kecGeom._id}
            fillOpacity={0.1}
            weight={0.5}
            fillColor="red"
            color="red"
            positions={
              flip(JSON.parse(JSON.stringify(kecGeom.location))).coordinates
            }
          >
            {/* <Tooltip>{kecGeom.NAMA}</Tooltip> */}
          </Polygon>
        </Pane>
      ))}

      {kelGeom.map((kelGeom) => (
        <Pane key={kelGeom._id} style={{ zIndex: 16000 }}>
          <Polygon
            eventHandlers={{
              click: (e) => {
                setBounds(e.target.getBounds());
                setGeojson(kelGeom.location);
                setName(kelGeom.NAMA);
                setKelId(kelGeom._id);
              },
              ...eventHandlersPolygon,
            }}
            key={kelGeom._id}
            fillOpacity={0.1}
            weight={0.5}
            fillColor="green"
            color="green"
            positions={
              flip(JSON.parse(JSON.stringify(kelGeom.location))).coordinates
            }
          >
            {/* <Tooltip>{kabkotGeom.NAMA}</Tooltip> */}
          </Polygon>
        </Pane>
      ))}
    </>
  );
}

export default Administration;
