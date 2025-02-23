import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../_services/auth";

interface UnAuthGuardProps {
  children: React.ReactNode;
}

const UnAuthGuard: React.FC<UnAuthGuardProps> = ({ children }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async (): Promise<void> => {
    try {
      const user = await AuthService.getProfile();
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

  return status ? <>{children}</> : <></>;
};

export default UnAuthGuard;
