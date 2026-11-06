import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function LoginLogic() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const { checkAuth } = useAuth();

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const loadingToast = toast.loading("Sedang masuk...");

        try {
            await api.post("/login", {
                email: email,
                password: password,
            });

            await checkAuth();

            toast.success("Berhasil login, selamat datang", { id: loadingToast });

            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                if (status === 422) {
                    if (data.errors) {
                        if (data.errors.email) {
                            // Ambil pesan eror pertama dari array email
                            toast.error(data.errors.email[0], { id: loadingToast });
                        } else {
                            const firstKey = Object.keys(data.errors)[0];
                            toast.error(data.errors[firstKey][0], { id: loadingToast });
                        }
                    } else {
                        toast.error(data.message, { id: loadingToast });
                    }
                } else if (status === 429) {
                    toast.error(data.message, { id: loadingToast });
                } else {
                    toast.error(`Terjadi kesalahan server (${status})`, { id: loadingToast });
                }
            } else if (error.request) {
                toast.error("Gagal terhubung ke server. Cek koneksi internet", { id: loadingToast });
            } else {
                toast.error(`Terjadi kesalahan sistem : ${error.message}`, { id: loadingToast });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { email, setEmail, password, setPassword, isLoading, login };
}