import React from "react";
import { Popup } from "react-leaflet";
import PopupAdministrasi from "./PopupAdministrasi";
import PopupContainer from "./PopupContainer";
import PopupDemography from "./PopupDemography";
import PopupEF from "./PopupEF";
import "./popupgrid.scss";
import PopupValue from "./PopupValue";

function PopupGrid({ data }) {
  const isAnyDemographyData =
    data.agegenderDetails || data.educationDetails || data.religionDetails;
  return (
    <Popup className="popupLeaflet" closeOnClick={false}>
      <div className="popupContainer">
        <div className="popupTitle">Grid Information</div>
      </div>
      <PopupValue title={"Title"} data={data}></PopupValue>
      <PopupAdministrasi data={data}></PopupAdministrasi>
      <PopupDemography data={data}></PopupDemography>
      {data.poi && <PopupEF data={data}></PopupEF>}
    </Popup>
  );
}

export default PopupGrid;
