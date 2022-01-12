export const theMovieAPIKey=process.env.REACT_APP_THEMOVIEDB_API_KEY;

export const theMovieImageURL="https://image.tmdb.org/t/p/original";


export const theMovieURL={
    fetchLatestMovie:`/movie/latest?api_key=${theMovieAPIKey}&language=en-US`,
    fetchPopularMovie:`/movie/popular?api_key=${theMovieAPIKey}`,
    fetchMovieDetail:`/movie/{movie_id}?api_key=${theMovieAPIKey}&language=en-US`,
    fetchMovieCreditsDetail:`/movie/{movie_id}/credits?api_key=${theMovieAPIKey}&language=en-US`,
    fetchMovieVideosDetail:`/movie/{movie_id}/videos?api_key=${theMovieAPIKey}&language=en-US`,
}



// fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
//     fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
//     fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
//     fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
//     fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
//     fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
//     fetchMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
//     fetchSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
//     fetchWestern: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
//     fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
//     fetchTV: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,