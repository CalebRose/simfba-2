import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../_services/auth";
import { useAuthStore } from "../context/AuthContext";
import routes from "../_constants/routes";
import { PageContainer } from "../_design/Container";

interface UnAuthGuardProps {
  children: React.ReactNode;
}

const UnAuthGuard: React.FC<UnAuthGuardProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuthStore();
  const navigate = useNavigate();

  if (isLoading) {
    return <></>;
  }

  if (!isLoading && currentUser) {
    navigate(routes.HOME);
    return <></>;
  }

  return <>{children}</>;
};

export default UnAuthGuard;
