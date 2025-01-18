import { AuthProvider } from "./context/AuthContext";
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
                <AppRoutes />
              </SimBaseballProvider>
            </SimHCKProvider>
          </SimBBAProvider>
        </SimFBAProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
