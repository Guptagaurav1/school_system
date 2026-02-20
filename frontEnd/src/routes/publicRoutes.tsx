import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/Authcontext";

const PublicRoute: React.FC = () => {
  const { accessToken, adminuserDetails, studentDetails } = useAuth();

  if (accessToken) {

    if (adminuserDetails?.role_id === 1) {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (studentDetails?.role_id === 2) {
      return <Navigate to="/StudentDashboard" replace />;
    }

     if (adminuserDetails?.role_id === 3) {
      return <Navigate to="/TeacherDashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
