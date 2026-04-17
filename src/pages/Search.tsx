import { useState } from "react";
import Card from "../components/Ui/Card";
import SearchInput from "../components/Ui/SearchInput";
import useMovieSearch from "../hooks/useMovieSearch";
import { useGenresContext } from "../context/GenresContext";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const {searchResults, isLoading, isDebouncing} = useMovieSearch(searchQuery);
    const { genresMap } = useGenresContext();


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
                        {searchQuery.trim() === "" && (
                            <p className="text-gray-500 text-3xl">
                                Start typing to search for movies, shows, and
                                people.
                            </p>
                        )} 
                        { searchQuery.trim() !== "" && searchResults.length === 0 && !isDebouncing && !isLoading && (
                            <p className="text-gray-500 text-3xl">
                                No results found for "{searchQuery}".
                            </p>
                        )}
                        {(isLoading || isDebouncing) && (
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
