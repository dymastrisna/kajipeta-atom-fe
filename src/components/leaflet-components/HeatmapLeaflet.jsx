import HeatmapOverlay from "leaflet-heatmap";

import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { useEffect, useRef } from "react";

function HeatmapTest({ pointsdata }) {
  const context = useLeafletContext();
  const hmRef = useRef();
  const propsRef = useRef({ pointsdata });

  useEffect(() => {
    var testData = {
      max: 5000,
      data: pointsdata ? pointsdata : [],
    };
    var cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      radius: 0.005,
      maxOpacity: 0.5,
      // scales the radius based on map zoom
      scaleRadius: true,
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      useLocalExtrema: true,
      // which field name in your data represents the latitude - default "lat"
      latField: "lat",
      // which field name in your data represents the longitude - default "lng"
      lngField: "lng",
      // which field name in your data represents the data value - default "value"
      valueField: "count",
    };

    // var HeatmapLayerTest = new HeatmapOverlay(cfg);
    // HeatmapLayerTest.setData(testData);
    // const container = context.layerContainer || context.map;
    // container.addLayer(HeatmapLayerTest);

    hmRef.current = new HeatmapOverlay(cfg);
    hmRef.current.setData(testData);
    const container = context.layerContainer || context.map;
    container.addLayer(hmRef.current);

    return () => {
      container.removeLayer(hmRef.current);
    };
  }, []);

  return null;
}

export default HeatmapTest;
