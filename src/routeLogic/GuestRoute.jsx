import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loading />
    }

    if (user) {
        return <Navigate to='/dashboard' replace />
    }

    return <Outlet />
}