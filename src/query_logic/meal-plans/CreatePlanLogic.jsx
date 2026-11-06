import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function CreatePlanLogic(setAiResponse, setStep) {
    return useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/api/ai/generate', {
                budget: Number(data.budget),
                notes: data.notes
            });
            return response.data.data; // Harus berupa array/object sesuai struktur prompt di backend
        },

        onMutate: () => {
            return toast.loading("Sedang Meracik Menu...");
        },

        onSuccess: (data, variables, contextToastId) => {
            setAiResponse(data);
            setStep('SELECTION'); // Transisi UI ke halaman pemilihan
            toast.success('AI berhasil meracik menu!', { id: contextToastId });
        },
        onError: (error, variables, contextToastId) => {
            toast.error(error.response?.data?.message || 'Gagal menghubungi AI.', { id: contextToastId });
        }
    });
}