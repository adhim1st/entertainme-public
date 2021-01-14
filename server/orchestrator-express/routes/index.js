const router = require("express").Router();
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

// * Movies

router.get("/movies", async (req, res) => {
  try {
    const cache = await redis.get("movies");
    console.log("cache");
    if (cache) {
      res.send(JSON.parse(cache));
    } else {
      const movies = await axios.get("http://localhost:4001/movies");
      const data = movies.data;
      await redis.set("movies", JSON.stringify(data));
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/movies", async (req, res) => {
  try {
    const movies = await axios.post("http://localhost:4001/movies", {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    });
    const data = movies.data;
    await redis.del("movies");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/movies", async (req, res) => {
  try {
    const movies = await axios.delete(`http://localhost:4001/movies`);
    const data = movies.data;
    await redis.del("movies");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.put("/movies/:id", async (req, res) => {
  try {
    const movies = await axios.put(
      `http://localhost:4001/movies/${req.params.id}`,
      {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags,
      }
    );
    const data = movies.data;
    await redis.del("movies");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    const movies = await axios.delete(
      `http://localhost:4001/movies/${req.params.id}`
    );
    const data = movies.data;
    await redis.del("movies");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

// * Series

router.get("/series", async (req, res) => {
  try {
    const cache = await redis.get("series");
    console.log("cache");
    if (cache) {
      res.send(JSON.parse(cache));
    } else {
      const series = await axios.get("http://localhost:4002/series");
      const data = series.data;
      await redis.set("series", JSON.stringify(data));
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/series", async (req, res) => {
  try {
    const series = await axios.post("http://localhost:4002/series", {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    });
    const data = series.data;
    await redis.del("series");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/series", async (req, res) => {
  try {
    const series = await axios.delete(`http://localhost:4002/series`);
    const data = series.data;
    await redis.del("series");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.put("/series/:id", async (req, res) => {
  try {
    const series = await axios.put(
      `http://localhost:4002/series/${req.params.id}`,
      {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags,
      }
    );
    const data = series.data;
    await redis.del("series");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/series/:id", async (req, res) => {
  try {
    const series = await axios.delete(
      `http://localhost:4002/series/${req.params.id}`
    );
    const data = series.data;
    await redis.del("series");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
