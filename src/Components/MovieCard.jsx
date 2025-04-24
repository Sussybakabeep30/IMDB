import React from "react";

function MovieCard({ movieObj, handleList, watchList }) {
  const isInWatchlist = watchList.some((movie) => movie.id === movieObj.id);

  return (
    <div
      className="relative w-full sm:w-[200px] md:w-[240px] lg:w-[270px] aspect-[2/3] bg-cover bg-center rounded-xl shadow-lg transition-transform hover:scale-105"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieObj.poster_path})`,
      }}
    >
      {/* Watchlist Button */}
      <div
        onClick={() => handleList(movieObj)}
        className="absolute top-2 left-2 h-8 w-8 flex items-center justify-center bg-black/60 rounded-full text-white text-lg cursor-pointer"
        title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        {isInWatchlist ? "✖️" : "😍"}
      </div>

      {/* Movie Title */}
      <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-2 font-semibold text-base sm:text-lg rounded-b-xl">
        {movieObj.title}
      </div>
    </div>
  );
}

export default MovieCard;
