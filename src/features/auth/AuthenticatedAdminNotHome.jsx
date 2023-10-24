import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function AuthenticatedAdminNotHome({ children }) {
  const { authUser, initialLoading } = useAuth();

  if (initialLoading) {
    return <div>Loading...</div>;
  }

  if (authUser?.role === "ADMIN") {
    return <Navigate to="/admin" />;
  }
  return children;
}
