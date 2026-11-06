import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
    const { user, isLoading, isLoggingOut } = useAuth();

    if (isLoading || isLoggingOut) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}