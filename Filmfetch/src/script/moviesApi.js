import fetch from "node-fetch";


export async function fetchMovie(id) {
  const response = await fetch("https://lernia-kino-cms.herokuapp.com/api/movies/" + id);
  const movies = await response.json();
  return movies.data;
}

export async function fetchMovies() {
  const response = await fetch("https://lernia-kino-cms.herokuapp.com/api/movies");
  const movies = await response.json();
  return movies.data;
}