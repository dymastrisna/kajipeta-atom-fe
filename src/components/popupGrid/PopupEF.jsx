import React from "react";
import PopupContainer from "./PopupContainer";

function PopupEF({ data }) {
  return (
    <PopupContainer title="Economic Factors">
      {/* <table>
        {data.poi &&
          data.poi.map((poi) => (
            <tr>
              <td>{poi.name}</td>
              <td>: {poi.jumlah}</td>
            </tr>
          ))}
      </table> */}
      {data.poi.map((poi, i) => (
        <div style={{ display: "flex" }} key={i}>
          <div style={{ flex: "1" }}></div>
          <div style={{ flex: "4" }}>{poi.name}</div>
          <div style={{ flex: "1" }}>: </div>
          <div style={{ flex: "4" }}>{poi.points.length}</div>
        </div>
      ))}
    </PopupContainer>
  );
}

export default PopupEF;
