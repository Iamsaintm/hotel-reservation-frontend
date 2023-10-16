import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function Authenticated({ children }) {
  const { authUser, initialLoading } = useAuth();

  if (initialLoading) {
    // If initialLoading is true, user data is still being loaded.
    // You can show a loading indicator or handle it as needed.
    return <div>Loading...</div>;
  }
  if (!authUser) {
    return <Navigate to="/" />;
  }
  return children;
}
