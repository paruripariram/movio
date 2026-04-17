import { createContext, useContext } from "react";
import type { GenresMap } from "../types";

interface GenresContextType {
    genresMap: GenresMap;
}

export const GenresContext = createContext<GenresContextType>({
    genresMap: {}
});

export function useGenresContext() {
    const context = useContext(GenresContext);
    if(!context) {
        throw new Error("useGenresContext must be used within a GenresProvider");
    }

    return context;
}