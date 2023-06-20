import axios from "axios";
import React, { useState } from "react";
import authStore from "../../context/auth";
import dispStore from "../../context/displaystate";
import useStore from "../../context/store";
import MyContainer from "../container/MyContainer";
import "./inputsavegrid.scss";
import SuccesDialog from "./SuccesDialog";

function InputSaveGrid() {
  const [isSGopen, togleSG] = dispStore((state) => [
    state.isSGopen,
    state.togleSG,
  ]);
  const [poi, demography, geojson, aa, gridsize] = useStore((state) => [
    state.poi,
    state.demography,
    state.geojson,
    state.listisolineData,
    state.gridsize,
  ]);
  const [inputName, setInptName] = useState("");
  const [saveLoading, setsaveLoading] = useState(false);
  const user = authStore((state) => state.user);
  const save = async () => {
    if (inputName !== "") {
      await axios
        .post(process.env.REACT_APP_API_URL + "/api/grid/save", {
          name: inputName,
          poi: poi.map((prop) => prop.name),
          location: geojson,
          uid: user.uid,
          agegender: demography,
          allocationaccess: aa,
          gridsize: gridsize,
        })
        .then(() => {
          setsaveLoading(true);
        })
        .catch((e) => {
          alert("The name is already exists");
        });
      setInptName("");
    }
    // setsaveLoading(false);
  };
  return (
    <MyContainer
      title={"Save Grid"}
      isOpen={isSGopen}
      onTogle={() => togleSG()}
    >
      <div className="filename">
        <input
          type="text"
          placeholder="File name"
          value={inputName}
          onChange={(e) => setInptName(e.target.value)}
        />
      </div>
      {saveLoading ? (
        <button className="saveButton">loading..</button>
      ) : (
        <button className="saveButton" onClick={() => save()}>
          Save
        </button>
      )}
      <SuccesDialog
        open={saveLoading}
        onClose={() => setsaveLoading(false)}
      ></SuccesDialog>
    </MyContainer>
  );
}

export default InputSaveGrid;
