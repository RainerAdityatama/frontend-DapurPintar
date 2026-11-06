import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function GetPlansForHome() {
    return useQuery({
        queryKey: ['daily-plans', 'home'],
        queryFn: async () => {
            const response = await api.get('/api/daily-plans/home');
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5,
    });
}