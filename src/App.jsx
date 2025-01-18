import { SimFBAProvider } from "./context/SimFBAContext";
import AppRoutes from "./routes/AppRoutes";

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
