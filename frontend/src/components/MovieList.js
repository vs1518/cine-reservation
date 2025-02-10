import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* 🎬 BANNIÈRE */}
      <div className="relative h-96 flex items-center justify-center bg-cover bg-center" 
           style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1 className="relative text-5xl font-extrabold text-white">🎬 Films Populaires</h1>
      </div>

      {/* 🏆 GRID DES FILMS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
        {movies.map((movie) => (
          <div key={movie.id} className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
            <img className="w-full h-96 object-cover transition duration-300 group-hover:scale-110" 
                 src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                 alt={movie.title} />
            
            {/* Détails du film */}
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p className="text-sm opacity-70">⭐ {movie.vote_average} / 10</p>
              <button className="mt-3 bg-red-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-700">
                Voir Détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
