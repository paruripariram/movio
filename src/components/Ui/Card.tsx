import type { SearchResult } from "../../types";
import noPoster from "../../assets/noPoster.png";

interface CardProps {
    item: SearchResult;
    genres: string[];
}

function Card({ item, genres }: CardProps) {
    const title = ("title" in item ? item.title : item.name) || "Untitled";
    const posterUrl = item.poster_path;
    const imageSrc = posterUrl
        ? `https://image.tmdb.org/t/p/w500${posterUrl}`
        : noPoster;
    // const overview = isMedia ? item.overview : "";
    const voteAverage = item.vote_average
    return (
        <div className="relative flex max-w-92.5 w-full aspect-2/3 overflow-hidden rounded-4xl cursor-pointer">
            <img
                src={imageSrc}
                alt={title}
                className="absolute top-0 left-0 w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = noPoster)}
            />
            <div className="z-10 flex flex-col mt-auto w-full p-5 bg-linear-to-t from-back-link-color to-transparent via-back-link-color/80">
                <span className="absolute top-5 right-5 w-15 h-10 rounded-4xl p-2 text-center font-bold text-primary bg-back-link-color/80">
                    {voteAverage !== null && voteAverage?.toFixed(1)}
                </span>
                <h3 className="text-xl font-extrabold text-white ">{title}</h3>
                <div>
                    {genres.map((genre) => (
                        <span key={genre} className="text-white">
                            {genre.charAt(0).toUpperCase() +
                                genre.slice(1).toLowerCase()}{" "}
                        </span>
                    ))}
                </div>
                {/* <p className="text-sm text-white">{overview}</p> */}
            </div>
        </div>
    );
}

export default Card;
