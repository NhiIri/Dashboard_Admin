import React from "react";
import SideMenuCpn from "../components/SideMenuComponent/SideMenuComponent";
import Navbar from "../components/Navbar/Navbar";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
        <SideMenuCpn />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default DefaultComponent;
