import { useEffect, useState } from "react";
import Card from "../components/Ui/Card";
import SearchInput from "../components/Ui/SearchInput";
import useMovieSearch from "../hooks/useMovieSearch";
import { useGenresContext } from "../context/GenresContext";
import Toggler from "../components/Ui/Toggler";
import { useSearchParams } from "react-router";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        searchResults,
        isLoading,
        error,
        setError,
        isDebouncing,
        page,
        setPage,
        hasMore,
        setRetryCount,
    } = useMovieSearch(searchQuery, searchParams.get("type") as "movie" | "tv");
    const { genresMap } = useGenresContext();
    useEffect (()=> {
        if(searchParams.get("type") === null) {
            setSearchParams({type: "movie"})
        }
    },[])

    function typeHandler() {
        if(searchParams.get("type") === "movie"){
            setSearchParams({type: "tv"})
        }else{
            setSearchParams({type: "movie"})
        }
    }

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
                        <Toggler type={searchParams.get("type") as "movie" | "tv"} typeHandler={typeHandler}/>
                    </aside>
                    <div className="flex-1 min-w-0 flex flex-col">
                        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 p-6 justify-items-center">
                            {error && (
                                <div className="col-span-full flex flex-col items-center py-10 gap-4">
                                    <p className="flex w-60 h-20 border-zinc-800 text-zinc-400 text-3xl text-center">
                                        Failed to load results.
                                    </p>
                                    <button
                                        className="bg-primary text-white w-40 h-12 rounded-xl flex items-center justify-center relative disabled:opacity-70 cursor-pointer shadow-glow hover:shadow-glow-bold"
                                        onClick={() => {
                                            setError(null);
                                            setRetryCount((prev) => prev + 1);
                                        }}
                                    >
                                        Try again
                                    </button>
                                </div>
                            )}
                            {searchQuery.trim() === "" && (
                                <p className="text-gray-500 text-3xl">
                                    Start typing to search for movies, shows,
                                    and people.
                                </p>
                            )}
                            {searchQuery.trim() !== "" &&
                                searchResults.length === 0 &&
                                !isDebouncing &&
                                !isLoading &&
                                !error && (
                                    <p className="text-gray-500 text-3xl">
                                        No results found for "{searchQuery}".
                                    </p>
                                )}
                            {(isLoading || isDebouncing) && page === 1 && (
                                <div className="flex flex-col items-center justify-center min-h-screen col-span-full">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Please, wait...
                                    </p>
                                </div>
                            )}
                            {searchResults.length > 0 &&
                                searchResults.map((item) => {
                                    const itemGenres = item.genre_ids
                                        .map((id) => genresMap[id])
                                        .filter((name): name is string =>
                                            Boolean(name),
                                        );
                                    return (
                                        <Card
                                            key={item.id}
                                            item={item}
                                            genres={itemGenres}
                                        />
                                    );
                                })}
                        </div>
                        {hasMore && (
                            <button
                                disabled={isLoading}
                                className="self-center mt-6 bg-primary text-white w-40 h-12 rounded-xl flex items-center justify-center relative disabled:opacity-70 cursor-pointer shadow-glow hover:shadow-glow-bold"
                                onClick={() =>
                                    setPage((prevPage) => prevPage + 1)
                                }
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    "Show more"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
