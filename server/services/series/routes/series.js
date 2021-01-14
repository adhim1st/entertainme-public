const router = require("express").Router();
const SeriesController = require("../controllers/series-controller");

router.get("/", SeriesController.findSeries);
router.post("/", SeriesController.createSeries);
router.delete("/", SeriesController.removeAllSeries);
router.put("/:id", SeriesController.updateSeries);
router.delete("/:id", SeriesController.removeOneSeries);
module.exports = router;
