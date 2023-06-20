import { width } from "@mui/system";
import React from "react";

function PopupContainer({ title, children, maxHeight }) {
  return (
    <div style={{ width: "100%", marginBlock: "13px" }}>
      <div style={{ fontWeight: "550", textAlign: "center" }}>
        {title}
        <hr style={{ height: "1px" }}></hr>
      </div>

      <div style={{ overflowY: "scroll", maxHeight: maxHeight ?? "100px" }}>
        {children}
      </div>
    </div>
  );
}

export default PopupContainer;
