import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../_services/auth";
import { useAuthStore } from "../context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { setCurrentUser } = useAuthStore();
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async (): Promise<void> => {
    try {
      const user = await AuthService.getProfile(true);
      if (!user) {
        navigate(`/login`);
      } else {
        setCurrentUser(user.data);
        setStatus(true);
      }
    } catch (error) {
      navigate(`/login`);
    }
  };

  return status ? <>{children}</> : <></>;
};
