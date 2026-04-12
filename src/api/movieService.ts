import api from "./axios";

export const search = async (query: string, page: number = 1) => {
    const response = await api.get("/search/multi", {
        params: { query, page }
    });
    return response.data.results;
}

