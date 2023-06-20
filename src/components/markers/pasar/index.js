import L from "leaflet";
const pasarMarkerCollection = {
  Kecil: new L.Icon({
    iconUrl: require("../../../img/pasarKuning.png"),
    iconSize: new L.Point(12, 12),
  }),
  Sedang: new L.Icon({
    iconUrl: require("../../../img/pasarBiru.png"),
    iconSize: new L.Point(12, 12),
  }),
  Besar: new L.Icon({
    iconUrl: require("../../../img/pasarMerah.png"),
    iconSize: new L.Point(12, 12),
  }),
};
export default pasarMarkerCollection;
