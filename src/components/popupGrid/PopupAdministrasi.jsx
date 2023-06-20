import React from "react";
import PopupContainer from "./PopupContainer";

function PopupAdministrasi({ data }) {
  return (
    <PopupContainer title={"Administration"}>
      <table>
        <tr>
          <td>Kelurahan</td>
          <td className="regionName">: {data.desa}</td>
        </tr>
        <tr>
          <td>Kecamatan</td>
          <td>: {data.kecamatan}</td>
        </tr>
        <tr>
          <td>Kab/Kota</td>
          <td>: {data.kabkot}</td>
        </tr>
      </table>
    </PopupContainer>
  );
}

export default PopupAdministrasi;
