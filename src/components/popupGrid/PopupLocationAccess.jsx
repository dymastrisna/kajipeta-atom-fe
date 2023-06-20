import React from "react";
import { Popup } from "react-leaflet";
import PopupAdministrasi from "./PopupAdministrasi";
import PopupDemography from "./PopupDemography";
import PopupEF from "./PopupEF";
import "./popupgrid.scss";

function PopupLocationAccess({ data }) {
  const isAnyDemographyData =
    data.agegenderDetails || data.educationDetails || data.religionDetails;
  return (
    <Popup className="popupLeaflet" closeOnClick={false} autoClose={false}>
      <div className="popupContainer">
        <div className="popupTitle">Location Access</div>
      </div>
      {/* Administrasi */}
      <PopupAdministrasi data={data}></PopupAdministrasi>

      {/* Demography */}
      {isAnyDemographyData && <PopupDemography data={data}></PopupDemography>}

      {/* POI */}
      {data.poi && <PopupEF data={data}></PopupEF>}
    </Popup>
  );
}

export default PopupLocationAccess;
