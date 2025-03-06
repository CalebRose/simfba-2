import { AdminPageProvider } from "./context/AdminPageContext";
import { AuthProvider } from "./context/AuthContext";
import { LeagueProvider } from "./context/LeagueContext";
import { SimBaseballProvider } from "./context/SimBaseballContext";
import { SimBBAProvider } from "./context/SimBBAContext";
import { SimFBAProvider } from "./context/SimFBAContext";
import { SimHCKProvider } from "./context/SimHockeyContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="dark">
      <AuthProvider>
        <SimFBAProvider>
          <SimBBAProvider>
            <SimHCKProvider>
              <SimBaseballProvider>
                <LeagueProvider>
                  <AdminPageProvider>
                    <AppRoutes />
                  </AdminPageProvider>
                </LeagueProvider>
              </SimBaseballProvider>
            </SimHCKProvider>
          </SimBBAProvider>
        </SimFBAProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
