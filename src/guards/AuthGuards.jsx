import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../_services/auth";
import { useSimFBAStore } from "../context/SimFBAContext";
import { useAuthStore } from "../context/AuthContext";

export const AuthGuard = ({ component }) => {
  const { setCurrentUser } = useAuthStore();
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
