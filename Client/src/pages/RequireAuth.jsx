import React from "react";
import { GetCurrentUser } from "../services/AuthService";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = GetCurrentUser();

  if (user && user !== undefined) return children;
  else return <Navigate to="/login" replace />;
};
export default RequireAuth;
