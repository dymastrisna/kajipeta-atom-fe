import axios from "axios";
import create from "zustand";
import { devtools } from "zustand/middleware";

import geojsonBoundingBox from "geojson-bounding-box";

let store = (set, get) => ({
  //================================================
  bounds: [
    [6.401464409093003, 94.69495913398464],
    [-10.103552119569041, 141.444058094734],
  ],
  setBounds: (newBond) => set(() => ({ bounds: newBond })),
  setBoundsByGeo: (geometry) => {
    const newBound = geojsonBoundingBox(geometry);
    return set(() => ({
      bounds: [
        [newBound[1], newBound[0]],
        [newBound[3], newBound[2]],
      ],
    }));
  },
  //================================
  locationName: "...",
  setLocationName: (newName) =>
    set(() => ({
      locationName: newName,
    })),
  //=================================================================
  kelId: "all",
  kecId: "all",
  kabId: "all",
  provId: "all",
  setkelId: (newkelId) => set(() => ({ kelId: newkelId })),
  setkecId: (newkecId) => set(() => ({ kecId: newkecId })),
  setkabId: (newkabId) => set(() => ({ kabId: newkabId })),
  setprovId: (newprovId) => set(() => ({ provId: newprovId })),
  kelGeo: [],
  kecGeo: [],
  kabGeo: [],
  provGeo: [],
  setkelGeo: async (kecid) => {
    let newkelGeo = await axios
      .get(process.env.REACT_APP_API_URL + "/api/kelurahan?kecid=" + kecid)
      .then((result) => {
        return result.data;
      })
      .catch((e) => []);
    return set(() => ({ kelGeo: newkelGeo, kelId: "all", kecId: kecid }));
  },
  setkecGeo: async (kabkotid) => {
    let newkecGeo = await axios
      .get(
        process.env.REACT_APP_API_URL + "/api/kecamatan?kabkotid=" + kabkotid
      )
      .then((result) => {
        return result.data;
      })
      .catch((e) => []);
    return set(() => ({
      kecGeo: newkecGeo,
      kelGeo: [],
      kelId: "all",
      kecId: "all",
      kabId: kabkotid,
    }));
  },
  setkabGeo: async (provid) => {
    let newkabGeo = await axios
      .get(process.env.REACT_APP_API_URL + "/api/kabkot?provid=" + provid)
      .then((result) => {
        return result.data;
      })
      .catch((e) => []);
    return set(() => ({
      kabGeo: newkabGeo,
      kecGeo: [],
      kelGeo: [],
      kelId: "all",
      kecId: "all",
      kabId: "all",
      provId: provid,
    }));
  },
  setprovGeo: async () => {
    let newprovGeo = await axios
      .get(process.env.REACT_APP_API_URL + "/api/provinsi")
      .then((result) => {
        return result.data;
      })
      .catch((e) => []);
    return set(() => ({
      provGeo: newprovGeo,
      kabGeo: [],
      kecGeo: [],
      kelGeo: [],
    }));
  },
  // for search by text
  setGeoId: async (provId, kabId, kecId, kelId) => {
    var kabGeo = await axios
      .get(process.env.REACT_APP_API_URL + "/api/kabkot?provid=" + provId)
      .then((result) => {
        return result.data;
      });
    var kecGeo = [];
    var kelGeo = [];
    if (kabId != "all") {
      kecGeo = await axios
        .get(process.env.REACT_APP_API_URL + "/api/kecamatan?kabkotid=" + kabId)
        .then((result) => {
          return result.data;
        });
    }
    if (kecId != "all") {
      kelGeo = await axios
        .get(process.env.REACT_APP_API_URL + "/api/kelurahan?kecid=" + kecId)
        .then((result) => {
          return result.data;
        });
    }

    return set(() => ({
      kelId: kelId,
      kecId: kecId,
      kabId: kabId,
      provId: provId,
      kabGeo: kabGeo,
      kecGeo: kecGeo,
      kelGeo: kelGeo,
    }));
  },
});

store = devtools(store);
const admState = create(store);

export default admState;
