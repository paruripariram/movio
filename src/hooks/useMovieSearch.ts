import { useEffect, useState } from "react";
import type { SearchResult } from "../types";
import { search } from "../api/movieService";
import axios from "axios";

export default function useMovieSearch(searchQuery: string) {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDebouncing, setIsDebouncing] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            setIsLoading(false);
            setError(null);
            setIsDebouncing(false);
            return;
        }
        setIsDebouncing(true);

        const abortController = new AbortController();
        const signal = abortController.signal;

        const debounceTimeout = setTimeout(async () => {
            setIsDebouncing(false);
            setIsLoading(true);
            try {
                const query = searchQuery.trim();
                if (query) {
                    const data = await search({ query, signal });
                    setSearchResults(data.results);
                    setError(null);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled");
                    return;
                }
                console.error("Error fetching search results:", error);
                setError(
                    "Failed to load search results. Please try again later.",
                );
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(debounceTimeout);
            abortController.abort();
        };
    }, [searchQuery]);
    return { searchResults, isLoading, error, isDebouncing, setError };
}
