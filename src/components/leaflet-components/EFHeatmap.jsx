import { useMemo } from "react";
import { LayersControl } from "react-leaflet";
import useStore from "../../context/store";
import HeatmapTest from "./HeatmapLeaflet";

function EFHeatmap() {
  const [poiResume] = useStore((state) => [state.poiResume]);
  useMemo(() => {}, [poiResume]);
  return (
    <>
      {poiResume.map((poidata, i) => {
        return (
          <LayersControl.Overlay key={i} name={poidata.name}>
            <HeatmapTest
              pointsdata={poidata.points.map((point) => ({
                lat: point.coordinates[0],
                lng: point.coordinates[1],
                count: 1,
              }))}
            ></HeatmapTest>
          </LayersControl.Overlay>
        );
      })}
    </>
  );
}

export default EFHeatmap;
