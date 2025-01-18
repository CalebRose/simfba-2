import { Route } from "react-router-dom";
import { AuthGuard } from "../guards/AuthGuards";
import { Home } from "../components/Home/Home";
import routes from "../_constants/routes";
import { NotFoundPage } from "../components/NotFound/NotFound";
import { AvailableTeams } from "../components/AvailableTeams/AvailableTeams";

// Will Add More Pages here for authorized users (Logged in)
export const AuthRoutes = [
  <Route
    key="Home"
    path={routes.HOME}
    element={<AuthGuard component={<Home />} />}
  />,
  <Route
    key="Home"
    path={routes.AVAILABLE_TEAMS}
    element={<AuthGuard component={<AvailableTeams />} />}
  />,
];
