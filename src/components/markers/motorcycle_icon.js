import L from "leaflet";

const motorcycleIcon = new L.Icon({
  iconUrl: require("../../img/motorcycle_icon.png"),
  iconRetinaUrl: require("../../img/motorcycle_icon.png"),
  iconSize: new L.Point(50, 50),
  //   className: "leaflet-div-icon",
});

export default motorcycleIcon;
