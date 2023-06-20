import L from "leaflet";

const bankIcon = new L.Icon({
  iconUrl: require("../../img/bank_icon.png"),
  iconRetinaUrl: require("../../img/bank_icon.png"),
  iconAnchor: null,
  popupAnchor: new L.Point(0, 0),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(8, 8),
  //   className: "leaflet-div-icon",
});

export default bankIcon;
