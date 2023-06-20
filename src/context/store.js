import axios from "axios";
import create from "zustand";
import { devtools } from "zustand/middleware";
import geojsonBoundingBox from "geojson-bounding-box";

let store = (set, get) => ({
  //=======================================
  gridsize: 2000,
  setGridSize: (ns) => set(() => ({ gridsize: ns })),
  //================================

  geojson: {
    type: "Polygon",
    coordinates: [],
  },
  setGeojson: (newGeojson) =>
    set(() => ({
      geojson: newGeojson,
    })),
  //=================================================================
  geometryString: "",
  setGeometryString: (newGeometry) =>
    set(() => ({ geometryString: newGeometry })),
  //=================================================================
  isLoading: false,
  setIsLoading: (status) => set(() => ({ isLoading: status })),

  grid: [],
  setGrid: (newGrid) => set(() => ({ grid: newGrid })),
  poi: [],
  setPoi: (newPoi) => set(() => ({ poi: newPoi })),

  demographySelected: [], //on demography input display
  setdemographySelected: (newdemographySelected) =>
    set(() => ({ demographySelected: newdemographySelected })),

  //Demography Category Selected
  agegender: [], //on demography input api (agegender)
  setAgeGender: (newagegender) => set(() => ({ agegender: newagegender })),
  profession: [], //on demography input api (profession)
  setprofession: (newprofession) => set(() => ({ profession: newprofession })),
  education: [], //on demography input api (education)
  seteducation: (neweducation) => set(() => ({ education: neweducation })),
  religion: [], //on demography input api (religion)
  setreligion: (newreligion) => set(() => ({ religion: newreligion })),

  //result
  poiResume: [],
  demographyAgeGenderAll: {},
  demographyEducationAll: [],
  demographyProfessionAll: [],
  demographyReligionAll: [],
  setPoiResume: (newPoiResume) => set(() => ({ poiResume: newPoiResume })),
  categoryNumber: [
    { category: "Acceptable 1", jumlah: 0 },
    { category: "Acceptable 2", jumlah: 0 },
    { category: "Acceptable 3", jumlah: 0 },
    { category: "Acceptable 4", jumlah: 0 },
    { category: "Acceptable 5", jumlah: 0 },
  ],
  analyze: async () => {
    function minimumTimeLoading(ms) {
      return new Promise((resolve) => {
        return setTimeout(() => {
          resolve();
        }, ms);
      });
    }

    let getGrid = axios.post(process.env.REACT_APP_API_URL + "/api/grid/", {
      poi: get().poi.map((prop) => prop.name),
      agegender: get().agegender,
      profession: get().profession.map((e) => e.value),
      education: get().education.map((e) => e.value),
      religion: get().religion.map((e) => e.value),
      geometry: get().geojson,
      gridsize: get().gridsize,
    });
    let [gridResponse] = await Promise.all([getGrid, minimumTimeLoading(2000)]);
    // console.log(gridResponse);

    let grid = gridResponse.data;
    if (grid[0].poi) {
      let poiObject = {};
      //create object with poiname as property
      grid[0].poi.forEach((poidata) => {
        poiObject[poidata.name] = { points: [] };
      });

      grid.forEach((griddata) => {
        //merge points data
        griddata.poi.forEach((poidata) => {
          poiObject[poidata.name]["points"] = poiObject[poidata.name][
            "points"
          ].concat(poidata.points);
        });
      });
      //object to list
      var keys = Object.keys(poiObject);
      var poiResume = [];
      keys.forEach((key) => {
        poiResume.push({
          name: key,
          points: poiObject[key].points,
          isLoading: false,
        });
      });
    } else {
      var poiResume = [];
    }

    //calculate category number
    let valueCount = [
      { category: "Acceptable 1", jumlah: 0 },
      { category: "Acceptable 2", jumlah: 0 },
      { category: "Acceptable 3", jumlah: 0 },
      { category: "Acceptable 4", jumlah: 0 },
      { category: "Acceptable 5", jumlah: 0 },
    ];
    grid.forEach((griddata) => {
      let value = griddata.value;
      console.log(value);
      switch (true) {
        case value >= 0.8:
          valueCount[0].jumlah++;
          break;
        case value >= 0.6:
          valueCount[1].jumlah++;
          break;
        case value >= 0.4:
          valueCount[2].jumlah++;
          break;
        case value >= 0.2:
          valueCount[3].jumlah++;
          break;
        default:
          valueCount[4].jumlah++;
      }
    });

    // calculate age gander all grid
    var demographyAgeGenderAll = getAgeGenderDemographyArea(gridResponse.data);
    // calculate profession all grid
    var demographyProfessionAll = getCategoryDemographyArea({
      grid: gridResponse.data,
      demographyCategory: "professionDetails",
    });
    // calculate education all grid
    var demographyEducationAll = getCategoryDemographyArea({
      grid: gridResponse.data,
      demographyCategory: "educationDetails",
    });
    // calculate Religion all grid
    var demographyReligionAll = getCategoryDemographyArea({
      grid: gridResponse.data,
      demographyCategory: "religionDetails",
    });

    return set(() => ({
      grid: gridResponse.data,
      poiResume: poiResume,
      demographyAgeGenderAll: demographyAgeGenderAll,
      demographyProfessionAll: demographyProfessionAll,
      demographyEducationAll: demographyEducationAll,
      demographyReligionAll: demographyReligionAll,
      categoryNumber: valueCount, //category all grid
      isLoading: false,
    }));
  },
  //=================================================================
  clienData: [],
  getClientData: async () => {
    let respClientData = await axios.post(
      process.env.REACT_APP_API_URL + "/api/clientdata/gadai",
      // process.env.REACT_APP_API_URL + "/api/clientdata/pgd",
      // process.env.REACT_APP_API_URL + "/api/clientdata/circlek",
      { geometry: get().geojson }
    );
    return set(() => ({ clienData: respClientData.data }));
  },
  //=================================================================
  distance: 500,
  setDistance: (newDistance) => set(() => ({ distance: newDistance })),
  mode: "walk",
  setMode: (newMode) => set(() => ({ mode: newMode })),
  editMode: "add",
  setEditMode: (newEditMode) => set(() => ({ editMode: newEditMode })),
  listisolineData: [],
  addIsoline: async (lat, lng) => {
    const isolineResponse = await axios.post(
      process.env.REACT_APP_API_URL +
        `/api/isoline/?lat=${lat}&lng=${lng}&distance=${get().distance}&mode=${
          get().mode
        }`,
      {
        poi: get().poi.map((prop) => prop.name),
        agegender: get().agegender,
        profession: get().profession.map((e) => e.value),
        education: get().education.map((e) => e.value),
        religion: get().religion.map((e) => e.value),
      }
    );
    let listisolineData = get().listisolineData;
    return set(() => ({
      listisolineData: [...listisolineData, isolineResponse.data],
    }));
  },

  deleteIsoline: (lat, lng) => {
    let newlistisolineData = get().listisolineData.filter((item) => {
      return item.latlng.lat !== lat && item.latlng.lng !== lng;
    });
    return set(() => ({
      listisolineData: newlistisolineData,
    }));
  },
});

store = devtools(store);
// store = persist(store, { name: "map_settings" });
const useStore = create(store);

export default useStore;

const getAgeGenderDemographyArea = (grid) => {
  if (grid[0].agegenderDetails) {
    let demographyObject = {};
    //create object with gander as property as property
    grid[0].agegenderDetails.forEach((e) => {
      demographyObject[e.name] = 0;
    });

    grid.forEach((griddata) => {
      //merge points data
      griddata.agegenderDetails.forEach((e) => {
        demographyObject[e.name] = demographyObject[e.name] + e.value;
      });
    });
    return demographyObject;
  } else {
    return {};
  }
};

const getCategoryDemographyArea = ({ grid, demographyCategory }) => {
  if (grid[0][demographyCategory]) {
    let categorySelectedObject = {};
    //create object with category name as property and number as value
    grid[0][demographyCategory].forEach((detailData) => {
      categorySelectedObject[detailData.name] = 0;
    });

    grid.forEach((griddata) => {
      //count detail demgraphy object in array
      griddata[demographyCategory].forEach((detailDemographyData) => {
        categorySelectedObject[detailDemographyData.name] +=
          detailDemographyData["value"];
      });
    });
    // object to list
    var keys = Object.keys(categorySelectedObject);
    var categoryDemographyAll = []; // expect  [{name: ... , value: ...},{name: ... , value: ...}]
    keys.forEach((key) => {
      categoryDemographyAll.push({
        name: key,
        value: categorySelectedObject[key],
      });
    });
  } else {
    var categoryDemographyAll = [];
  }
  return categoryDemographyAll;
};
