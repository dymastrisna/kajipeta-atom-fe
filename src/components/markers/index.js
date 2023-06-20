import L from "leaflet";

const markerCollection = {
  Pasar: new L.Icon({
    iconUrl: require("../../img/marker/Trans - pasar tradisional.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  Pegadaian: new L.Icon({
    iconUrl: require("../../img/marker/Pegadaian.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  Indomaret: new L.Icon({
    iconUrl: require("../../img/marker/Minimarket - Indomaret.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  Alfamart: new L.Icon({
    iconUrl: require("../../img/marker/Minimarket -  alfamart.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  ATM: new L.Icon({
    iconUrl: require("../../img/marker/General - ATM.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  Bank: new L.Icon({
    iconUrl: require("../../img/marker/General - Bank.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  ConvStore: new L.Icon({
    iconUrl: require("../../img/marker/General - Minimarket.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  CircleK: new L.Icon({
    iconUrl: require("../../img/marker/Minimarket - circle K.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  Restaurant: new L.Icon({
    iconUrl: require("../../img/marker/General - Restoran.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  RumahSakit: new L.Icon({
    iconUrl: require("../../img/marker/Kesehatan - RS.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  SPBU: new L.Icon({
    iconUrl: require("../../img/marker/Trans - Pom Bensin.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  Puskesmas: new L.Icon({
    iconUrl: require("../../img/marker/Kesehatan - Puskesmas.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  KRL: new L.Icon({
    iconUrl: require("../../img/marker/Trans - Stasiun.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  BMT: new L.Icon({
    iconUrl: require("../../img/pasar_icon.png"),
    iconSize: new L.Point(12, 12),
  }),
  BPRS: new L.Icon({
    iconUrl: require("../../img/BPRS_icon.png"),
    iconSize: new L.Point(20, 20),
  }),
  Sekolah: new L.Icon({
    iconUrl: require("../../img/marker/General - Sekolah.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  Pesantren: new L.Icon({
    iconUrl: require("../../img/marker/Ibadah - islam.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
  BRI: new L.Icon({
    iconUrl: require("../../img/marker/Bank BRI.png"),
    iconSize: new L.Point(16, 24),
    iconAnchor: new L.Point(8, 24),
  }),
};
export default markerCollection;
