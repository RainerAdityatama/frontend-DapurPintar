import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function RegisterLogic() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State untuk Loading
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const Register = async (e) => {
        // Mencegah halaman refresh otomatis saat tombol ditekan
        e.preventDefault();

        // set loading agar berjalan
        setIsLoading(true);

        const LoadingToast = toast.loading(
            "Sedang Melakukan Registrasi, Mohon Tunggu..."
        );

        try {
            await api.post("/register", {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
            });

            toast.success("Register Berhasil, Silahkan Login", { id: LoadingToast });

            navigate("/login");
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                // 422, error validasi
                if (status === 422) {
                    if (data.errors) {
                        // menggambil eror satu persatu dari errors
                        const firstErrorKey = Object.keys(data.errors)[0];
                        // Ambil pesan errornya
                        const firstErrorMessage = data.errors[firstErrorKey][0];
                        toast.error(firstErrorMessage, { id: LoadingToast });
                    } else {
                        toast.error(data.message, { id: LoadingToast });
                    }
                } else if (status === 429) {
                    toast.error(
                        data.message || "Terlalu banyak request, Silahkan tunggu 1 menit", { id: LoadingToast }
                    );
                } else {
                    toast.error(`Terjadi Kesalahan server ${status}`, { id: LoadingToast });
                }
            } else if (error.request) {
                toast.error("Gagal terhubung ke server. Cek koneksi internet.", { id: LoadingToast });
            } else {
                toast.error(`Terjadi kesalahan sistem : ${error.message}`, { id: LoadingToast });
            }
        } finally {
            // hentikan loading
            setIsLoading(false);
        }
    };

    return {
        name,
        email,
        password,
        confirmPassword,
        isLoading,
        Register,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
    };
}