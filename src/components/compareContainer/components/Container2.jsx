import React, { useState } from "react";
import "./container2.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Container2({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="container2">
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

export default Container2;
