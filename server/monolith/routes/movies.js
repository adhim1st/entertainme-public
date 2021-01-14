const router = require("express").Router();
const MovieController = require("../controllers/movie-controller");

router.get("/", MovieController.findMovies);
router.post("/", MovieController.createMovies);
router.delete("/", MovieController.removeAllMovie);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.removeOneMovie);
module.exports = router;
