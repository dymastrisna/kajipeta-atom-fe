// require("leaflet.markercluster");
import React from "react";
import L, { Point } from "leaflet";
import "leaflet.markercluster";
import "./markerCluster.scss";

import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useRef } from "react";
import markerCollection from "../markers";

function MarkerClusterExmp({ point, poiName, category }) {
  const context = useLeafletContext();
  const mcRef = useRef();

  const points = point || [{ name: "", coordinates: [0, 0] }];

  useEffect(() => {
    mcRef.current = new L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        var childCount = cluster.getChildCount();
        var c = category || "Default";
        if (childCount < 10) {
          c += " small";
        } else if (childCount < 50) {
          c += " medium";
        } else {
          c += " large";
        }
        return new L.DivIcon({
          html: "<div><span>" + childCount + "</span></div>",
          className: "marker-cluster " + c,
          iconSize: new L.Point(40, 40),
        });
      },

      spiderfyShapePositions: function (count, centerPt) {
        var distanceFromCenter = 30,
          markerDistance = 40,
          lineLength = markerDistance * (count - 1),
          lineStart = centerPt.y - lineLength / 2,
          res = [],
          i;

        res.length = count;

        for (i = count - 1; i >= 0; i--) {
          res[i] = new Point(
            centerPt.x + distanceFromCenter,
            lineStart + markerDistance * i
          );
        }
        return res;
      },
    });

    points.forEach((e) => {
      var marker = L.marker(e.coordinates, {
        icon: markerCollection[poiName],
      });
      marker.bindTooltip(e.name);
      mcRef.current.addLayer(marker);
    });

    const container = context.layerContainer || context.map;
    container.addLayer(mcRef.current);

    return () => {
      container.removeLayer(mcRef.current);
    };
  }, []);

  return null;
}

export default MarkerClusterExmp;
