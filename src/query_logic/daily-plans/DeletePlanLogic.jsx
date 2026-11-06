import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeletePlanLogic() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (id) => {
            const response = await api.delete(`/api/daily-plans/${id}`);
            return response.data;
        },

        onMutate: () => {
            return toast.loading("Sedang memproses data...");
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success(data.message, { id: contextToastId });

            // validasi cache, jika ada data baru maka refresh datanya
            queryClient.invalidateQueries({ queryKey: ["daily-plans"] });
            navigate('/daily-plans');
        },

        onError: (error, variables, contextToastId) => {
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                if (status === 422) {
                    const firstErrorKey = Object.keys(data.errors)[0];
                    const firstErrorMessage = data.errors[firstErrorKey][0];
                    toast.error(firstErrorMessage, { id: contextToastId });
                } else {
                    toast.error(`Terjadi kesalahan server ${status}`, { id: contextToastId })
                }
            } else {
                toast.error(error.message || "Gagal terhubung ke server", { id: contextToastId });
            }
        }
    });
}