import React, { useState } from "react";
import "./mycontainer.scss";
import { MdOutlineAddBox } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

function MyContainer({ children, title, isOpen, onTogle }) {
  return (
    <div className="inputParamConatiner">
      <div className="paramTitle">
        <div style={{ width: "90%" }}>{title}</div>
        <div className="icon" onClick={onTogle}>
          {isOpen ? (
            <IoIosClose></IoIosClose>
          ) : (
            <MdOutlineAddBox></MdOutlineAddBox>
          )}
        </div>
      </div>
      {isOpen && <>{children}</>}
    </div>
  );
}

export default MyContainer;
