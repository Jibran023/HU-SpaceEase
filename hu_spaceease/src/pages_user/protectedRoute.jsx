import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check the flag from localStorage

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
