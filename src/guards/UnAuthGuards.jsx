import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../_services/auth";

const UnAuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkToken();
  }, [component]);

  const checkToken = async () => {
    try {
      let user = await AuthService.getProfile();
      if (!user) {
        localStorage.removeItem("token");
      } else {
        navigate(`/home`);
      }
      setStatus(true);
    } catch (error) {
      navigate(`/login`);
    }
  };

  return status ? <React.Fragment>{component}</React.Fragment> : <></>;
};

export default UnAuthGuard;
