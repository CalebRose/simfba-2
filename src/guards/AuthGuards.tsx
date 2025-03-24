import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../_services/auth";
import { useAuthStore } from "../context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuthStore();
  const navigate = useNavigate();

  // ✅ Wait for loading to complete before checking authentication
  if (isLoading) {
    return <></>; // Or a loading spinner
  }

  if (!currentUser) {
    navigate(`/login`);
    return <></>;
  }

  return <>{children}</>;
};
