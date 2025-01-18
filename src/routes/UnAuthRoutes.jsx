import { Route } from "react-router-dom";
import { SignUpPage } from "../components/SignUpPage/SignUpPage";
import UnAuthGuard from "../guards/UnAuthGuards";
import { LoginPage } from "../components/SignUpPage/LoginPage";
import routes from "../_constants/routes";

// Pages for non-signed in users
export const UnAuthRoutes = [
  <Route
    key="SignUpPage"
    path={routes.REGISTER}
    element={<UnAuthGuard component={<SignUpPage />} />}
  />,
  <Route
    key="LoginPage"
    path={routes.LOGIN}
    element={<UnAuthGuard component={<LoginPage />} />}
  />,
];
