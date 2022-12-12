require("dotenv").config();

const express = require("express");
const { validateMovie, validateUser } = require("./validators.js");

const app = express();

app.use(express.json()); // add this line
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

// PAssword allowed ? ==> send token
const verifyPassword = (req, res) => {
  res.send(req.user);
};
const isItDwight = (req, res) => {
  if (
    req.body.email === "dwight@theoffice.com" &&
    req.body.password === "123456"
  ) {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};

/**METHODES GET */
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

/**METHODE POST */
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
const { hashPassword } = require("./auth.js");
app.post("/api/users", hashPassword, userHandlers.postUser);

/**METHODE PUT */
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);

/**METHODE DELETE */
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
