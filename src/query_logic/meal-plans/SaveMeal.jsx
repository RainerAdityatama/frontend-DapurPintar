import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function SaveMeal() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            // payload di sini sudah berbentuk JSON sesuai contoh yang kamu berikan
            const response = await api.post('/api/daily-plans', payload);
            return response.data;
        },

        onMutate: () => {
            return toast.loading("Sedang Menyimpan Menu...");
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success(data.message || 'Rencana makan berhasil disimpan!', { id: contextToastId });
            queryClient.invalidateQueries({ queryKey: ["daily-plans"] });
            navigate('/dashboard'); // Kembali ke halaman utama
        },
        onError: (error, variables, contextToastId) => {
            toast.error(error.response?.data?.message || 'Gagal menyimpan data.', { id: contextToastId });
        }
    });
}