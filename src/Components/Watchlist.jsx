import React, { useState, useEffect } from "react";

function Watchlist({ watchList, setWatchList }) {
  const genreids = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 18: "Drama", 10751: "Family", 14: "Fantasy",
    36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery",
    10749: "Romance", 878: "Science Fiction", 10770: "TV Movie",
    53: "Thriller", 10752: "War", 37: "Western",
  };

  const [currGenre, setCurrGenre] = useState("All Genres");
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const savedWatchList = localStorage.getItem("watchlist");
    if (savedWatchList && setWatchList) {
      setWatchList(JSON.parse(savedWatchList));
    }
  }, []);

  useEffect(() => {
    if (watchList) {
      localStorage.setItem("watchlist", JSON.stringify(watchList));
    }
  }, [watchList]);

  useEffect(() => {
    const temp = watchList.map((movieObj) => genreids[movieObj.genre_ids[0]]);
    const genreArray = new Set(temp);
    setGenreList(["All Genres", ...genreArray]);
  }, [watchList]);

  function handleGenre(genre) {
    setCurrGenre(genre);
  }

  function handleDelete(id) {
    const updated = watchList.filter((movieObj) => movieObj.id !== id);
    setWatchList(updated);
  }

  function toggleSortOrder() {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  const filteredAndSortedList = watchList
    .filter((movieObj) =>
      currGenre === "All Genres" || genreids[movieObj.genre_ids[0]] === currGenre
    )
    .filter((movieObj) =>
      movieObj.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-[#f2d3bf] to-white to-white min-h-screen">
      {/* Genre Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleGenre(genre)}
            className={`px-4 py-2 rounded-xl font-semibold cursor-pointer transition ${
              currGenre === genre
                ? "bg-blue-600 text-white"
                : "bg-blue-200 text-gray-900"
            }`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          placeholder="Search Movies"
          className="w-full max-w-xs px-4 py-2 bg-white border border-gray-400 rounded outline-none"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-gray-100 text-sm sm:text-base">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th
                onClick={toggleSortOrder}
                className="cursor-pointer px-4 py-2"
              >
                Ratings {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th className="px-4 py-2">Popularity</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedList.map((movieObj) => (
              <tr key={movieObj.id} className="border-b">
                <td className="flex items-center px-4 py-4 text-left space-x-4">
                  <img
                    className="h-20 w-28 object-cover rounded"
                    src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                    alt={movieObj.title}
                  />
                  <span className="text-sm sm:text-base">{movieObj.title}</span>
                </td>
                <td className="px-4">{movieObj.vote_average}</td>
                <td className="px-4">{movieObj.popularity}</td>
                <td className="px-4">{genreids[movieObj.genre_ids[0]]}</td>
                <td
                  className="text-red-500 cursor-pointer px-4"
                  onClick={() => handleDelete(movieObj.id)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Watchlist;
