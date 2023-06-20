import L from "leaflet";

const pasarIcon = new L.Icon({
  iconUrl: require("../../img/pasar_icon.png"),
  iconRetinaUrl: require("../../img/pasar_icon.png"),
  iconAnchor: null,
  popupAnchor: new L.Point(0, 0),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(12, 12),
  //   className: "leaflet-div-icon",
});

export default pasarIcon;
