const router = require("express").Router();
const routeSeries = require("./series");

router.use("/series", routeSeries);

module.exports = router;
