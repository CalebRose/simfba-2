import { useEffect, useState } from "react";
import { SimFBAProvider } from "./context/SimFBAContext";
import AppRoutes from "./routes/AppRoutes";
import { SideMenu } from "./components/SideMenu/SideMenu";

function App() {
  return (
    <div className="dark">
      <SimFBAProvider>
        <AppRoutes />
      </SimFBAProvider>
    </div>
  );
}

export default App;
