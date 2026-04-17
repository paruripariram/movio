import { useEffect, useState } from "react";
import { search, getMovieGenres, getTvGenres } from "../api/movieService";
import type { SearchResult, GenresMap } from "../types";
import Card from "../components/Ui/Card";
import SearchInput from "../components/Ui/SearchInput";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [genresMap, setGenresMap] = useState<GenresMap>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const movieGenres = await getMovieGenres();
                const tvGenres = await getTvGenres();
                console.log(movieGenres);
                console.log(tvGenres);
                setGenresMap({ ...movieGenres, ...tvGenres });
            } catch (error) {
                console.error("Error fetching genres:", error);
                setError("Failed to load genres. Please try again later.");
            }
        };
        getGenres();
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const query = searchQuery.trim();
                    if (query) {
                        const data = await search({ query, signal });
                        setSearchResults(data.results);
                    } else {
                        setSearchResults([]);
                    }
                } catch (error) {
                    console.error("Error fetching search results:", error);
                    setError(
                        "Failed to load search results. Please try again later.",
                    );
                } finally {
                    setIsLoading(false);
                }
            },
            debounceTimeout = setTimeout(fetchData, 500);

        return () => {
            clearTimeout(debounceTimeout);
            abortController.abort();
        };
    }, [searchQuery]);

    return (
        <>
            <div className="flex flex-col gap-10">
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex">
                    <aside className="bg-black text-white w-70 h-150 rounded-4xl shrink-0">
                        ФИЛЬТРЫ
                    </aside>
                    <div className="flex-1 min-w-0 w-full grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 p-6 justify-items-center">
                        {searchResults.length === 0 && !isLoading && (
                            <p className="text-gray-500 text-3xl">
                                Start typing to search for movies, shows, and
                                people.
                            </p>
                        )}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center min-h-screen col-span-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Please, wait...
                                </p>
                            </div>
                        )}
                        {searchResults.length > 0 &&
                            searchResults.map((item) => {
                                const itemGenres =
                                    item.media_type !== "person"
                                        ? item.genre_ids
                                              .map((id) => genresMap[id])
                                              .filter((name): name is string =>
                                                  Boolean(name),
                                              )
                                        : [];
                                return (
                                    <Card
                                        key={item.id}
                                        item={item}
                                        genres={itemGenres}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
