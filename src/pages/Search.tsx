import { useEffect, useState } from "react";
import { search, getMovieGenres, getTvGenres } from "../api/movieService";
import type { SearchResult, GenresMap } from "../types";
import Card from "../components/Ui/Card";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [genresMap, setGenresMap] = useState<GenresMap>({});

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
            }
        };
        getGenres();
    }, []);

    useEffect(() => {
        const getTestData = async () => {
            try {
                const data = await search("Гарри Поттер");
                console.log(data);
                setSearchResults(data.results);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        getTestData();
    }, []);

    return (
        <>
            <div className="flex p-10">
                <aside className="bg-black text-white w-64 h-150 rounded-4xl flex-shrink-0">
                    ФИЛЬТРЫ
                </aside>
                <div className="flex-1 min-w-0 w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 p-6">
                    {searchResults.map((item) => {
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
        </>
    );
}

export default Search;
