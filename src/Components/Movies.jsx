import React, { useEffect, useState } from "react";
import Card from "../Components/MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ HandleWatchList, watchList }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const pageNext = () => setPage(page + 1);
  const pagePrev = () => setPage(Math.max(1, page - 1));

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=094271a42e41a9570babc754869c5426&language=en-US&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-[#f2d3bf] to-white min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
        Trending Movies
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-700">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movieObj) => (
            <Card
              key={movieObj.id}
              movieObj={movieObj}
              handleList={HandleWatchList}
              watchList={watchList}
            />
          ))}
        </div>
      )}

      <Pagination Pageno={page} nex={pageNext} prev={pagePrev} />
    </div>
  );
}

export default Movies;
