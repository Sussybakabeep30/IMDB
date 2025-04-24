import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recom() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieId = 550; // Fight Club
  const apiKey = "094271a42e41a9570babc754869c5426";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US`)
      .then(res => {
        setRecommendations(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch recommendations", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-[#f2d3bf] to-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center ">
        Recommended Movies
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading recommendations...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendations.map((movie) => (
            <div key={movie.id} className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded mb-3"
              />
              <h2 className="text-base sm:text-lg font-semibold">
                {movie.title}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recom;
