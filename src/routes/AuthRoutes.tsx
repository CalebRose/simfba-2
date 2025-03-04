import { Route } from "react-router-dom";
import { AuthGuard } from "../guards/AuthGuards";
import { Home } from "../components/Home/Home";
import routes from "../_constants/routes";
import { NotFoundPage } from "../components/NotFound/NotFound";
import { AvailableTeams } from "../components/AvailableTeams/AvailableTeams";
import { AdminPage } from "../components/Admin/AdminPage";
import { ProfilePage } from "../components/Profile/ProfilePage";
import { TeamPage } from "../components/Team/TeamPage";

// Will Add More Pages here for authorized users (Logged in)
export const AuthRoutes = [
  <Route
    key="Home"
    path={routes.HOME}
    element={
      <AuthGuard>
        <Home />
      </AuthGuard>
    }
  />,
  <Route
    key="Available"
    path={routes.AVAILABLE_TEAMS}
    element={
      <AuthGuard>
        <AvailableTeams />
      </AuthGuard>
    }
  />,
  <Route
    key="Admin"
    path={routes.ADMIN}
    element={
      <AuthGuard>
        <AdminPage />
      </AuthGuard>
    }
  />,
  <Route
    key="Profile"
    path={routes.USER}
    element={
      <AuthGuard>
        <ProfilePage />
      </AuthGuard>
    }
  />,
  <Route
    key="Team"
    path={routes.TEAM}
    element={
      <AuthGuard>
        <TeamPage />
      </AuthGuard>
    }
  />,
];
