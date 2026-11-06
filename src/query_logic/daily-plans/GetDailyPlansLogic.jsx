import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function GetDailyPlansLogic(page) {
    return useQuery({
        queryKey: ["daily-plans", 'all', page],
        queryFn: async () => {
            const response = await api.get(`/api/daily-plans?page=${page}`);
            return response.data.data;
        },
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5, // Cache 5 menit
    });
}