import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/Authcontext";

interface ProtectedProps {
  allowRoles: number[];
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ allowRoles }) => {
  const { accessToken, expiry, adminuserDetails, studentDetails, logout } = useAuth();

  const isExpired = expiry && Date.now() > expiry;

  if (!accessToken || isExpired) {
    logout();
    return <Navigate to="/" replace />;
  }

  const currentUser = adminuserDetails || studentDetails;

  if (!currentUser) {
    logout();
    return <Navigate to="/" replace />;
  }

  if (!allowRoles.includes(currentUser.role_id)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
