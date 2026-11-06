import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export default function GetDetailDailyPlans(id) {
    return useQuery({
        queryKey: ['daily-plans', 'detail', id],
        queryFn: async () => {
            const response = await api.get(`/api/daily-plans/${id}`);
            return response.data.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    });
}