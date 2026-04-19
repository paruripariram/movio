import api from "./axios";
import type { Genre, GenresMap } from "../types/tmdb";

export const search = async ({query, type='movie', page = 1, signal}: {query: string, type?: string, page?: number, signal?: AbortSignal}) => {
    const response = await api.get(`/discover/${type}`, {
        params: { with_text_query: query, page },
        signal
    });
    return response.data;
}

export const getMovieGenres = async () => {
    const response = await api.get("/genre/movie/list");
    const genresMap = response.data.genres.reduce((acc: GenresMap, genre: Genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {} as GenresMap);
    return genresMap;
}

export const getTvGenres = async () => {
    const response = await api.get("/genre/tv/list");
    const genresMap = response.data.genres.reduce((acc: GenresMap, genre: Genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {} as GenresMap);
    return genresMap;
}