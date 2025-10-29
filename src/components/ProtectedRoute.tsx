import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { token } = useAuth();
  const location = useLocation();
  if (!token)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
