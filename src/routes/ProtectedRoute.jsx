import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
}

export default ProtectedRoute