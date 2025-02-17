import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useUserContext();

  if (isLoading) return null;

  if (!user) return <Navigate to="/authenticate" replace />;

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
