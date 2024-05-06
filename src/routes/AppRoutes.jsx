import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { AuthRoutes } from "./AuthRoutes";
import { UnAuthRoutes } from "./UnAuthRoutes";
import { SideMenu } from "../components/SideMenu/SideMenu";
import { AdminService } from "../_services/adminService";
import { SimFBAContext } from "../context/SimFBAContext";

// Import your components here

function AppRoutes() {
  const { cfb_Timestamp, cbb_Timestamp, setCFB_Timestamp, setCBB_Timestamp } =
    useContext(SimFBAContext);

  useEffect(() => {
    if (!cfb_Timestamp) {
      getCFBTimestamp();
    }
    if (!cbb_Timestamp) {
      getCBBTimestamp();
    }
  }, [cfb_Timestamp, cbb_Timestamp]);

  const getCFBTimestamp = async () => {
    const res = await AdminService.GetCFBTimestamp();
    if (res) {
      setCFB_Timestamp(() => res);
    }
  };

  const getCBBTimestamp = async () => {
    const res = await AdminService.GetCBBTimestamp();
    if (res) {
      setCBB_Timestamp(() => res);
    }
  };
  return (
    <Router>
      <SideMenu />
      <Routes>
        {AuthRoutes}
        {UnAuthRoutes}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
