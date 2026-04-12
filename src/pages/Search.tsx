import { useEffect, useState } from "react";
import { search } from "../api/movieService";
import type { SearchResult } from "../types";
import Card from "../components/Ui/Card";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        const getchTestData = async () => {
            try {
                const data = await search("Harry Potter");
                console.log(data);
                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        getchTestData();
    }, []);

    return (
        <>
            <div className="flex p-10">
                <aside className="bg-black text-white w-64 h-150 rounded-4xl flex-shrink-0">
                    ФИЛЬТРЫ
                </aside>
                <div className="flex-1 min-w-0 w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 p-6">
                    {searchResults.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Search;
