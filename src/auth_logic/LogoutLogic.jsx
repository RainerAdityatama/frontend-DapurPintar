import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function LogoutLogic() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { setUser, setIsLoggingOut } = useAuth();

    const logout = async () => {
        setIsLoggingOut(true);

        try {
            await api.post("/logout");

            queryClient.clear();

            setUser(null);
            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            if (error.response?.status === 401) {
                queryClient.clear();

                setUser(null);
                navigate("/login", {
                    replace: true,
                });
            } else {
                toast.error('Logout gagal, silahkan coba lagi');
            }
        } finally {
            setTimeout(() => {
                setIsLoggingOut(false);
            }, 200);
        }
    }

    return { logout };
}