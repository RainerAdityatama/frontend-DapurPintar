import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await api.get("/api/user");
            setUser(response.data); // Simpan objek user lengkap
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setUser(null);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, checkAuth, isLoggingOut, setIsLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);