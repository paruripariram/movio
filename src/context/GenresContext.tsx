import { useEffect, useState } from "react";
import type { GenresMap } from "../types";
import { getMovieGenres, getTvGenres } from "../api/movieService";
import { GenresContext } from "./GenresContext";



export function GenresProvider({ children }: { children: React.ReactNode }) {
    const [genresMap, setGenresMap] = useState<GenresMap>({ movieGenres: {}, tvGenres: {} });

    useEffect(() => {
        const getGenres = async () => {
            try {
                const movieGenres = await getMovieGenres();
                const tvGenres = await getTvGenres();
                setGenresMap({ movieGenres, tvGenres });
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        getGenres();
    }, []);
    
    return (
        <GenresContext.Provider value={{ genresMap }}>
            {children}
        </GenresContext.Provider>
    );
}
