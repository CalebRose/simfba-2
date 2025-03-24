import { Route } from "react-router-dom";
import { AuthGuard } from "../guards/AuthGuards";
import { Home } from "../components/Home/Home";
import routes from "../_constants/routes";
import { NotFoundPage } from "../components/NotFound/NotFound";
import { AvailableTeams } from "../components/AvailableTeams/AvailableTeams";
import { AdminPage } from "../components/Admin/AdminPage";
import { ProfilePage } from "../components/Profile/ProfilePage";
import { TeamPage } from "../components/Team/TeamPage";
import {
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../_constants/constants";
import { GameplanPage } from "../components/Gameplan/GameplanPage";
import { RecruitingPage } from "../components/Recruiting/RecruitingPage";

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
    key="CFB Team"
    path={routes.CFB_TEAM}
    element={
      <AuthGuard>
        <TeamPage league={SimCFB} />
      </AuthGuard>
    }
  />,
  <Route
    key="NFL Team"
    path={routes.NFL_TEAM}
    element={
      <AuthGuard>
        <TeamPage league={SimNFL} />
      </AuthGuard>
    }
  />,
  <Route
    key="CBB Team"
    path={routes.CBB_TEAM}
    element={
      <AuthGuard>
        <TeamPage league={SimCBB} />
      </AuthGuard>
    }
  />,
  <Route
    key="NBA Team"
    path={routes.NBA_TEAM}
    element={
      <AuthGuard>
        <TeamPage league={SimNBA} />
      </AuthGuard>
    }
  />,
  <Route
    key="CHL Team"
    path={routes.CHL_TEAM}
    element={
      <AuthGuard>
        <TeamPage league={SimCHL} />
      </AuthGuard>
    }
  />,
  <Route
    key="PHL Team"
    path={routes.PHL_TEAM}
    element={
      <AuthGuard>
        <TeamPage league={SimPHL} />
      </AuthGuard>
    }
  />,
  <Route
    key="CHL Team"
    path={routes.CHL_GAMEPLAN}
    element={
      <AuthGuard>
        <GameplanPage league={SimCHL} />
      </AuthGuard>
    }
  />,
  <Route
    key="PHL Team"
    path={routes.PHL_GAMEPLAN}
    element={
      <AuthGuard>
        <GameplanPage league={SimPHL} />
      </AuthGuard>
    }
  />,
  <Route
  key="CHL Recruiting"
  path={routes.CHL_RECRUITING}
  element={
    <AuthGuard>
      <RecruitingPage league={SimCHL} />
    </AuthGuard>
  }
/>,
  <Route
  key="CBB Recruiting"
  path={routes.CBB_RECRUITING}
  element={
    <AuthGuard>
      <RecruitingPage league={SimCBB} />
    </AuthGuard>
  }
/>,
  <Route
  key="CFB Recruiting"
  path={routes.CFB_RECRUITING}
  element={
    <AuthGuard>
      <RecruitingPage league={SimCFB} />
    </AuthGuard>
  }
/>,
];
