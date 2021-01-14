const router = require("express").Router();
const routeMovies = require("./movies");

router.use("/movies", routeMovies);

module.exports = router;
