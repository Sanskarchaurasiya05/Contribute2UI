
import { jwtDecode } from "jwt-decode";
import {  type JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}
const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = useSelector((state: any) => state.jwt);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded: any = jwtDecode(localStorage.getItem("token") || "");

    if (allowedRoles && !allowedRoles.includes(decoded.applicantType)) {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;