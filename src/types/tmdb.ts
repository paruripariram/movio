interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    media_type: "movie";
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date?: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface TVShow {
    adult: boolean;
    backdrop_path: string | null;
    first_air_date?: string;
    genre_ids: number[];
    id: number;
    media_type: "tv";
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}

// interface Person {
//     adult: boolean;
//     gender: number;
//     id: number;
//     known_for: (Movie | TVShow)[];
//     known_for_department: string;
//     media_type: "person";
//     name: string;
//     popularity: number;
//     profile_path: string | null;
// }

export type Genre = {
    id: number;
    name: string;
}
export type GenresMap = {
    movieGenres: Record<number, string>;
    tvGenres: Record<number, string>;
};

export type SearchResult = Movie | TVShow;