import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { AuthRoutes } from "./AuthRoutes";
import { UnAuthRoutes } from "./UnAuthRoutes";
import { SideMenu } from "../components/SideMenu/SideMenu";
import { SimFBAContext } from "../context/SimFBAContext";

// Import your components here

function AppRoutes() {
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
