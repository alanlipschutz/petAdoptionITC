import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRouteAdmin({ children }) {
  const { activeUser } = useAuth();
  if (!activeUser.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRouteAdmin;
