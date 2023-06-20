import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { MdAddLocationAlt, MdDelete } from "react-icons/md";
import useStore from "../../context/store";

function AAButton() {
  const [editmode, seteditMode] = useStore((state) => [
    state.editMode,
    state.setEditMode,
  ]);
  const handleChange = (event, newmode) => {
    if (newmode !== null) {
      seteditMode(newmode);
    }
  };
  return (
    <div
      style={{
        marginTop: "10px",
        background: "white",
        padding: "10px",
        borderRadius: "7px",
      }}
    >
      <ToggleButtonGroup
        color={editmode == "add" ? "info" : "error"}
        value={editmode}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        className="toglleButton"
        style={{ width: "100%" }}
      >
        <ToggleButton value="add" style={{ width: "50%" }}>
          <MdAddLocationAlt size={20}></MdAddLocationAlt> {"add"}
        </ToggleButton>
        <ToggleButton value="delete" style={{ width: "50%" }}>
          <MdDelete size={20}></MdDelete> delete
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default AAButton;
