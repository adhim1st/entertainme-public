const Series = require("../models/series");

class SeriesController {
  static findSeries(req, res) {
    Series.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static createSeries(req, res) {
    Series.create({
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
      });
  }

  static removeAllSeries(req, res) {
    Series.remove()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static updateSeries(req, res) {
    const payload = {
      id: req.params.id,
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Series.update(payload)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static removeOneSeries(req, res) {
    Series.removeOne(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = SeriesController;
