
import express from "express";
import { marked } from "marked";
import { fetchMovie, fetchMovies } from "./moviesApi.js";
import { engine } from "express-handlebars";

const server = express();
export default server; 
server.use(express.static("./src/static"));
server.set("view engine", "handlebars");
server.set("views", "./src/handlebars");
server.engine(
  "handlebars",
  engine({
    helpers: {
      markdown: (md) => marked(md),
    },
  })
);


server.get("/movies/:movieId", async (request, response) => {
  const movie = await fetchMovie(request.params.movieId);
  if (movie) {
    response.render("movie", { movie });
  } else {
    response.status(404).render("error");
  }
});

server.get("/", async (request, response) => {
  const movies = await fetchMovies();
  if (movies) {
    response.render("movies", { movies });
  } else {
    response.status(404).render("error");
  }
});

server.get("/*", async (request, response) => {
  response.status(404).render("error");
});
