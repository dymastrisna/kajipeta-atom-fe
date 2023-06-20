import "./sidebar.scss";

import { useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { BsPentagon } from "react-icons/bs";
import { GiOpenFolder } from "react-icons/gi";
import { TbArrowBearRight2, TbHeartRateMonitor } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import authStore from "../../context/auth";

const Sidebar = () => {
  const [setUser] = authStore((state) => [state.setUser]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/grid",
      name: "Grid",
      icon: <BsGridFill />,
    },
    {
      path: "/akr",
      name: "AKR Land",
      icon: <BsPentagon />,
    },
    {
      path: "/locationaccess",
      name: "Location Access",
      icon: <TbArrowBearRight2 />,
    },
    {
      path: "/compare",
      name: "Comparison",
      icon: <TbHeartRateMonitor />,
    },
    {
      path: "/mydata",
      name: "My Data ",
      icon: <GiOpenFolder />,
    },
  ];
  return (
    <>
      <div className="container">
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              kajipeta
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars className="icon" onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ fontSize: isOpen ? "15px" : "0px" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          <div className="bottom">
            <hr style={{ borderTop: "3px" }}></hr>
            <NavLink
              to={"/login"}
              key={"logout"}
              className="link"
              activeclassname="active"
            >
              <div className="icon" onClick={(e) => setUser({})}>
                <FaSignOutAlt></FaSignOutAlt>
              </div>
              <div
                style={{ fontSize: isOpen ? "15px" : "0px" }}
                className="link_text"
              >
                Log Out
              </div>
            </NavLink>
          </div>
        </div>
        {/* <main></main> */}
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
