import { useEffect, useState } from "react";
import type { MovieDetails, TVDetails } from "../types";
import { getMediaDetails } from "../api/movieService";
import axios from "axios";

export default function useMediaDetails(id: string, type: "movie" | "tv") {
    const [details, setDetails] = useState<MovieDetails | TVDetails | null>(
        null,
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setDetails(null);
        async function fetchMediaDetails(
            id: string,
            type: "movie" | "tv",
            signal: AbortSignal,
        ) {
            setLoading(true);
            setError(null);
            try {
                const data = await getMediaDetails(id, type, signal);
                setDetails(data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled");
                    return;
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        }
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetchMediaDetails(id, type, signal);
        return () => {
            abortController.abort();
        };
    }, [id, type]);

    return { details, loading, error };
}
