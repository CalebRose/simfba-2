import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../_services/auth";
import { NotFoundPage } from "../components/NotFound/NotFound";
import { SimFBAContext } from "../context/SimFBAContext";

export const AuthGuard = ({ component }) => {
  const { setCurrentUser } = useContext(SimFBAContext);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkToken();
  }, [component]);

  const checkToken = async () => {
    try {
      let user = await AuthService.getProfile(true);
      if (!user) {
        navigate(`/login`);
      }
      setCurrentUser(user.data);
      setStatus(true);
      return;
    } catch (error) {
      navigate(`/login`);
    }
  };

  return status ? <React.Fragment>{component}</React.Fragment> : <></>;
};
