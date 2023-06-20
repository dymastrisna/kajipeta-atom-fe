import React from "react";
import { TileLayer, LayersControl } from "react-leaflet";

function TileLayersOption() {
  return (
    <>
      <LayersControl.BaseLayer name="Google">
        <TileLayer
          url={`http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}`}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer checked={true} name="Land">
        <TileLayer
          url="https://api.mapbox.com/styles/v1/rosyidi/ckyjqu6j3k58t15pc67odh67v/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9zeWlkaSIsImEiOiJja3lqcXJ1aGowNmQ0MnZydW83OTZoNnlzIn0.p5ZLTV3RD7IYWhsmzLQ7tw"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Satelite">
        <TileLayer
          url={"http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Traffic">
        <TileLayer
          url={
            "https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}"
          }
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
      </LayersControl.BaseLayer>
    </>
  );
}

export default TileLayersOption;
