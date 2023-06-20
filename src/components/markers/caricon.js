import L from "leaflet";

const carIcon = new L.Icon({
  iconUrl: require("../../img/car_icon.png"),
  iconRetinaUrl: require("../../img/car_icon.png"),
  iconAnchor: null,
  popupAnchor: new L.Point(0, 0),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(20, 40),
  //   className: "leaflet-div-icon",
});

export default carIcon;
