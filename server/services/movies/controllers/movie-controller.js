const Movie = require("../models/movies");

class MovieController {
  static findMovies(req, res) {
    Movie.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static createMovies(req, res) {
    Movie.create({
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static removeAllMovie(req, res) {
    Movie.remove()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static updateMovie(req, res) {
    const payload = {
      id: req.params.id,
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Movie.update(payload)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static removeOneMovie(req, res) {
    Movie.removeOne(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = MovieController;
