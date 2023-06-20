import "./demographycontainer.scss";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React, { useState } from "react";

function DemographyContainer({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="demographyContainer">
      <div className="header">
        <div className="title2">{title}</div>
        <div className="icon" onClick={(e) => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoIosArrowUp></IoIosArrowUp>
          ) : (
            <IoIosArrowDown></IoIosArrowDown>
          )}
        </div>
      </div>

      <div className="content" style={{ display: isOpen ? "" : "none" }}>
        {children}
      </div>
    </div>
  );
}

export default DemographyContainer;
