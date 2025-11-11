
import { useAuth  } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const RoleProtectedRoute = ({ role }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.authorities || !user.authorities.includes(role)) {
        // 3. Wrong role? Send them back to the homepage.
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export default RoleProtectedRoute;